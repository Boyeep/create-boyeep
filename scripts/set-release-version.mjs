import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const version = process.argv[2];
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version ?? "")) {
  throw new Error("Pass a valid semver without a leading v.");
}

const root = process.cwd();
const manifests = [
  "package.json",
  "package-lock.json",
  "packages/next-bun-kit/package.json",
  "packages/nextjs-go-monorepo-kit/package.json",
  "packages/nextjs-go-realtime-kit/package.json",
  "packages/nextjs-python-ai-agent-kit/package.json",
  "packages/nextjs-python-ai-chatbot-kit/package.json",
  "packages/nextjs-python-computer-vision-kit/package.json",
  "packages/nextjs-python-rag-kit/package.json",
  "packages/nextjs-python-voice-assistant-kit/package.json",
  "packages/python-background-worker-kit/package.json",
  "packages/python-computer-vision-api-kit/package.json",
  "packages/python-document-intelligence-kit/package.json"
];

for (const relative of manifests) {
  const filename = path.join(root, relative);
  const manifest = JSON.parse(await readFile(filename, "utf8"));
  manifest.version = version;
  if (relative === "package-lock.json" && manifest.packages?.[""]) {
    manifest.packages[""].version = version;
  }
  await writeFile(filename, `${JSON.stringify(manifest, null, 2)}\n`);
}

console.log(`Prepared create-boyeep packages at ${version}.`);
