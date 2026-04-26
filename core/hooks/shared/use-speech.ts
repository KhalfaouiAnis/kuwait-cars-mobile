import useUserPreferencesStore from "@/core/store/preferences.store";
import {
  ExpoSpeechRecognitionModule,
  ExpoSpeechRecognitionResultEvent,
} from "expo-speech-recognition";
import { useCallback, useEffect, useState } from "react";

export const useSpeechToForm = (fieldName: string, formOnChange: any) => {
  const lang = useUserPreferencesStore((state) => state.lang);
  const [isRecording, setIsRecording] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleResult = useCallback(
    (event: ExpoSpeechRecognitionResultEvent) => {
      if (
        activeField === fieldName &&
        event.results &&
        event.results.length > 0
      ) {
        const transcribedText = event.results[0].transcript;
        formOnChange(transcribedText);
      }
      setIsRecording(false);
      setActiveField(null);
    },
    [activeField, fieldName, formOnChange],
  );

  useEffect(() => {
    const resultListener = ExpoSpeechRecognitionModule.addListener(
      "result",
      handleResult,
    );
    const errorListener = ExpoSpeechRecognitionModule.addListener(
      "error",
      (e) => {
        console.log("Speech recognition error:", e);
        setIsRecording(false);
        setActiveField(null);
      },
    );
    const startListener = ExpoSpeechRecognitionModule.addListener("start", () =>
      setIsRecording(true),
    );
    const endListener = ExpoSpeechRecognitionModule.addListener("end", () =>
      setIsRecording(false),
    );

    ExpoSpeechRecognitionModule.requestPermissionsAsync();

    return () => {
      resultListener.remove();
      errorListener.remove();
      startListener.remove();
      endListener.remove();
    };
  }, [handleResult]);

  const startListening = () => {
    if (isRecording) {
      ExpoSpeechRecognitionModule.stop();
    }

    setActiveField(fieldName);
    try {
      ExpoSpeechRecognitionModule.start({
        lang,
        interimResults: false,
      });
    } catch (error) {
      console.error("Failed to start recording:", error);
      setIsRecording(false);
      setActiveField(null);
    }
  };

  const stopListening = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  return {
    isRecordingForThisField: isRecording && activeField === fieldName,
    startListening,
    stopListening,
  };
};
