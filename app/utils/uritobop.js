import * as FileSystem from "expo-file-system";

export async function uriToBlob(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
}
