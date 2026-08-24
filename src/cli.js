import { confirm, input, select } from "@inquirer/prompts";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import kleur from "kleur";

import { findTemplate, templates } from "./catalog.js";
import { scaffold, validateProjectName } from "./scaffold.js";

function valueAfter(args, flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

export async function runCli({ fixedTemplate, defaultProjectName = "my-boyeep-app", args = process.argv.slice(2) } = {}) {
  if (args.includes("--help")) {
    const templateOption = fixedTemplate ? "" : " [--template <id>] [--list]";
    console.log(`Usage: ${fixedTemplate ? `create-${fixedTemplate}` : "create-boyeep"} [project-name]${templateOption} [--no-install]`);
    return;
  }

  if (!fixedTemplate && args.includes("--list")) {
    for (const item of templates) console.log(`${item.id.padEnd(16)} ${item.name} — ${item.description}`);
    return;
  }

  const positional = args.find((value, index, values) => !value.startsWith("-") && values[index - 1] !== "--template");
  const projectName = positional ?? await input({ message: "Project name", default: defaultProjectName, validate: (value) => validateProjectName(value) || "Use a lowercase npm-safe name." });
  const requested = fixedTemplate ?? valueAfter(args, "--template");
  const template = requested ? findTemplate(requested) : findTemplate(await select({ message: "Choose a template", choices: templates.map((item) => ({ value: item.id, name: item.name, description: item.description })) }));
  if (!template) throw new Error(`Unknown template: ${requested}`);

  console.log(kleur.cyan(`\nCreating ${template.name} in ${projectName}…`));
  const destination = await scaffold({ template, projectName });
  const shouldInstall = !args.includes("--no-install") && await confirm({ message: "Install dependencies now?", default: true });
  if (shouldInstall) {
    for (const recipe of template.install) {
      const cwd = path.resolve(destination, recipe.cwd);
      await new Promise((resolve, reject) => {
        const child = spawn(recipe.command, recipe.args, { cwd, stdio: "inherit", shell: process.platform === "win32" });
        child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${recipe.command} dependency installation failed.`)));
      });
    }
  }
  console.log(kleur.green(`\nReady: ${destination}`));
  console.log(`Next: cd ${projectName}`);
}
