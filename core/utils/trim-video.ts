import { trim } from "react-native-video-trim";

export async function trimVideo(
  uri: string,
  startTime: number,
  endTime: number
) {
  return trim(uri, {
    startTime,
    endTime,
  });
}
