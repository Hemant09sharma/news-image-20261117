import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const programDirectory = dirname(fileURLToPath(import.meta.url));
const assetPath = join(programDirectory, "assets", "entry.png");

function outputDirectory(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR;
  if (configured === undefined || configured.trim() === "") return "/output";
  return configured;
}

const imageBytes = readFileSync(assetPath);
const destinationDirectory = outputDirectory();
const destinationPath = join(destinationDirectory, "entry.png");

mkdirSync(destinationDirectory, { recursive: true });
writeFileSync(destinationPath, imageBytes);

const copied = readFileSync(destinationPath);
if (copied.length !== imageBytes.length || !copied.equals(imageBytes)) {
  throw new Error("copied entry.png does not match assets/entry.png");
}
