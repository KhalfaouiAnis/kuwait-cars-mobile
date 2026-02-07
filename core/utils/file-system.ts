import * as FileSystem from "expo-file-system";

export const MediaCacheService = {
  /**
   * Cleans up local files for a specific set of assets
   */
  async cleanupAssets(assets: any[]) {
    assets.forEach(async (asset) => {
      if (asset.uri && asset.uri.startsWith("file://")) {
        try {
          const file = new FileSystem.File(asset.uri);
          if (file.exists) {
            file.delete();
          }
        } catch (error) {
          console.error(`Failed to delete cache file: ${asset.uri}`, error);
        }
      }
    });
  },

  /**
   * Nuclear option: Clears the entire app cache directory
   * Use with caution!
   */
  async clearAllCache() {
    try {
      const cacheDir = new FileSystem.Directory(FileSystem.Paths.cache);

      if (cacheDir.exists) {
        cacheDir.delete();
        cacheDir.create();
      }
    } catch (e) {
      console.error("Failed to clear global cache", e);
    }
  },
};
