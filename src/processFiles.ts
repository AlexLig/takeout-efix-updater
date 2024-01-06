import { walkDir } from "./walkDir";

export async function processFiles(dir: string) {
  let jsonCount = 0;
  let notEndingWithJsonCount = 0;
  for await (const filePath of walkDir(dir)) {
    if (filePath.includes("json")) jsonCount += 1;
    if (filePath.includes("json") && !filePath.endsWith(".json"))
      notEndingWithJsonCount += 1;
  }
  console.log("JSON count:", jsonCount);
  console.log("Not ending with JSON count:", notEndingWithJsonCount);
}
