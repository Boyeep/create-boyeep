#!/usr/bin/env node
import { runCli } from "create-boyeep/cli";

await runCli({ fixedTemplate: "computer-vision", defaultProjectName: "my-vision-app" });

