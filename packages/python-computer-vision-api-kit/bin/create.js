#!/usr/bin/env node
import { runCli } from "create-boyeep/cli";

await runCli({ fixedTemplate: "vision-api", defaultProjectName: "my-vision-api" });

