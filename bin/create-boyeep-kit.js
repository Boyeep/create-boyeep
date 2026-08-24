#!/usr/bin/env node
import { confirm, input, select } from "@inquirer/prompts";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import kleur from "kleur";

import { findTemplate, templates } from "../src/catalog.js";
import { scaffold, validateProjectName } from "../src/scaffold.js";

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

if (process.argv.includes("--help")) {
  console.log("Usage: create-boyeep-kit [project-name] [--template agent|rag|documents|realtime|voice|worker] [--no-install]");
  process.exit(0);
}

const positional = process.argv.slice(2).find((value, index, values) => !value.startsWith("-") && values[index - 1] !== "--template");
const projectName = positional ?? await input({ message: "Project name", default: "my-boyeep-app", validate: (value) => validateProjectName(value) || "Use a lowercase npm-safe name." });
const requested = valueAfter("--template");
const template = requested ? findTemplate(requested) : findTemplate(await select({ message: "Choose a template", choices: templates.map((item) => ({ value: item.id, name: item.name, description: item.description })) }));
if (!template) throw new Error(`Unknown template: ${requested}`);

console.log(kleur.cyan(`\nCreating ${template.name} in ${projectName}…`));
const destination = await scaffold({ template, projectName });
const shouldInstall = !process.argv.includes("--no-install") && await confirm({ message: "Install dependencies now?", default: true });
if (shouldInstall) {
  const commands = template.id === "documents" || template.id === "worker"
    ? [["python", ["-m", "pip", "install", "-e", ".[dev]"], destination]]
    : [["npm", ["install"], path.join(destination, "frontend")], ["python", ["-m", "pip", "install", "-e", ".[dev]"], path.join(destination, "backend")]];
  for (const [command, args, cwd] of commands) {
    await new Promise((resolve, reject) => {
      const child = spawn(command, args, { cwd, stdio: "inherit", shell: process.platform === "win32" });
      child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} dependency installation failed.`)));
    });
  }
}
console.log(kleur.green(`\nReady: ${destination}`));
console.log(`Next: cd ${projectName}`);
