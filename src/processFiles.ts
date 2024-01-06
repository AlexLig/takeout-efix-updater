import { walkDir } from "./walkDir";

type MediaMetadataPair = {
  fileName: string;
  metadataPath?: string;
  mediaPath: string;
};

export async function processFiles(dir: string) {
  const metadataByFileName = new Map<string, string>();
  const mediaByFileName = new Map<string, string>();
  for await (const filePath of walkDir(dir)) {
    const fileName = filePath.split("/").pop()?.replace(".json", "");
    if (!fileName) continue;
    if (filePath.endsWith(".json")) {
      metadataByFileName.set(fileName, filePath);
    } else {
      mediaByFileName.set(fileName, filePath);
    }
  }
  const pairs: MediaMetadataPair[] = [];
  const noMetadataMedia: { fileName: string; mediaPath: string }[] = [];
  for (const [fileName, mediaPath] of mediaByFileName) {
    const metadataPath = metadataByFileName.get(fileName);
    if (!metadataPath) {
      noMetadataMedia.push({ fileName, mediaPath });
    }
    pairs.push({ fileName, metadataPath, mediaPath });
  }

  console.log("Pairs", pairs.length);
  console.log("No metadata", noMetadataMedia.length);

  return { pairs, noMetadataMedia };
}
