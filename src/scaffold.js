import { createWriteStream, existsSync } from "node:fs";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { extract } from "tar";

const OWNER = "Boyeep";

export function validateProjectName(name) {
  return /^(?:@[a-z0-9._-]+\/)?[a-z0-9][a-z0-9._-]*$/.test(name);
}

export async function scaffold({ template, projectName, cwd = process.cwd(), fetchImpl = fetch }) {
  if (!validateProjectName(projectName)) throw new Error("Project name must be npm-safe and lowercase.");
  const destination = path.resolve(cwd, projectName);
  if (existsSync(destination)) throw new Error(`Destination already exists: ${destination}`);
  const temporary = `${destination}.bkit-${process.pid}`;
  const archive = `${temporary}.tar.gz`;
  await mkdir(temporary, { recursive: true });
  try {
    const response = await fetchImpl(`https://codeload.github.com/${OWNER}/${template.repo}/tar.gz/refs/heads/main`);
    if (!response.ok || !response.body) throw new Error(`Template download failed (${response.status}).`);
    await pipeline(Readable.fromWeb(response.body), createWriteStream(archive));
    await extract({ file: archive, cwd: temporary, strip: 1 });
    await personalize(temporary, projectName);
    await rename(temporary, destination);
    return destination;
  } catch (error) {
    await rm(temporary, { recursive: true, force: true });
    throw error;
  } finally {
    await rm(archive, { force: true });
  }
}

async function personalize(directory, projectName) {
  for (const relative of ["package.json", "frontend/package.json"]) {
    const filename = path.join(directory, relative);
    if (!existsSync(filename)) continue;
    const manifest = JSON.parse(await readFile(filename, "utf8"));
    manifest.name = relative === "package.json" ? projectName : `${projectName}-frontend`;
    await writeFile(filename, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  for (const relative of [".env.example", "backend/.env.example"]) {
    const source = path.join(directory, relative);
    const target = path.join(directory, relative.replace(/\.example$/, ""));
    if (existsSync(source) && !existsSync(target)) await writeFile(target, await readFile(source));
  }
}
