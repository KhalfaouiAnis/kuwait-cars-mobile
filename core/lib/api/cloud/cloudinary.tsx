import axios from 'axios';

const uploadSingleFile = async (fileUri, mediaType) => {
    // 1. Get signed parameters from Node.js backend (one request per file upload task)
    const backendParams = await fetch('YOUR_BACKEND_SIGN_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send relevant data to trigger correct backend logic (e.g., 'profile_pic' vs 'product_image')
        body: JSON.stringify({
            type: 'product_image', // Assume this function is for product images
        }),
    }).then(res => res.json());

    const { signature, apiKey, cloudName, timestamp, upload_preset, folder } = backendParams;
    // Note: for images, you don't use 'eager' string like you did for the video scenario

    // 2. Prepare the FormData payload
    const formData = new FormData();
    formData.append('file', {
        uri: fileUri,
        type: 'image/jpeg',
        name: `upload_${timestamp}.jpg`,
    });
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('upload_preset', upload_preset);
    formData.append('folder', folder);

    // 3. Send the POST request directly to Cloudinary
    const cloudinaryUrl = `api.cloudinary.com{cloudName}/${mediaType}/upload`;

    const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        // Handle progress monitoring for individual files here if needed
    });

    if (response.status === 200) {
        return response.data.secure_url; // Return only the URL
    } else {
        throw new Error("Cloudinary upload failed");
    }
};

/**
 * Manages concurrent uploads of an array of image URIs.
 * @param {string[]} fileUris An array of local file URIs to upload.
 * @returns {Promise<string[]>} An array of all secure URLs once all uploads are complete.
 */
const uploadMultipleImages = async (fileUris) => {
    // Map the array of URIs to an array of Promises
    const uploadPromises = fileUris.map(uri => uploadSingleFile(uri, 'image'));

    try {
        // Use Promise.all to run all promises concurrently.
        // It waits for all uploads to finish (or the first one to reject).
        const results = await Promise.all(uploadPromises);

        console.log("All uploads finished:", results);
        // results is an array of all the secure_urls
        return results;

    } catch (error) {
        console.error("One or more uploads failed:", error);
        // If any promise in Promise.all rejects, it immediately jumps here.
        throw error;
    }
};

const handleUploadAllMedia = async () => {
    try {
        // Show loading state in UI...
        const secureUrls = await uploadMultipleImages(selectedImageUris);
        // Hide loading state...
        // Save the resulting `secureUrls` array to your database!
        console.log("Database URLs:", secureUrls);

    } catch (error) {
        // Handle global error, maybe retry functionality
    }
};
// ... (uploadSingleFile function is the same as before) ...

/**
 * Manages concurrent uploads for thumbnail, video, and additional images.
 * @param {string} thumbnailUri The URI for the thumbnail.
 * @param {string} videoUri The URI for the video (optional).
 * @param {string[]} imageUris An array of Uris for additional images.
 * @returns {Promise<{thumbnailUrl: string, videoUrl: string|null, imageUrls: string[]}>}
 */
const uploadStructuredMedia = async (thumbnailUri, videoUri = null, imageUris = []) => {

    // 1. Create an array of Promises, maintaining a specific order: [Thumbnail, Video, Image1, Image2...]
    const promises = [];

    // Add Thumbnail Promise (uses 'product_image' type in backend)
    promises.push(uploadSingleFile(thumbnailUri, 'image'));

    // Add Video Promise (uses dynamic type/params in backend)
    // You need a specific function for video that handles eager string/named transform logic
    // We can assume you have an uploadSingleVideoFile that takes audioFlag
    if (videoUri) {
        // Assume you have an uploadSingleVideo function that handles the complex params:
        promises.push(uploadSingleVideoFile(videoUri, 'video', 'mute'));
    }

    // Add general Images Promises
    imageUris.forEach(uri => {
        promises.push(uploadSingleFile(uri, 'image'));
    });

    try {
        // Use Promise.all to run all promises concurrently.
        const results = await Promise.all(promises);

        // 2. Map the ordered results back into your specific React Hook Form structure/keys

        let resultIndex = 0;

        const thumbnailUrl = results[resultIndex++];

        let videoUrl = null;
        if (videoUri) {
            videoUrl = results[resultIndex++];
        }

        const imageUrls = results.slice(resultIndex); // The remaining elements are the images

        return {
            thumbnail: thumbnailUrl,
            video: videoUrl,
            images: imageUrls,
        };

    } catch (error) {
        console.error("One or more uploads failed:", error);
        throw error;
    }
};