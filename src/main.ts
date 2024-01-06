import { processFiles } from "./processFiles";

async function main() {
  const args = process.argv.slice(2);

  const directoryPath = args.at(0);

  if (!directoryPath) throw new Error("No directory path provided");

  console.log("Directory Path:", directoryPath);

  await processFiles(directoryPath);
}

main();
