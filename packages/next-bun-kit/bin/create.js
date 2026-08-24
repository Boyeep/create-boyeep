#!/usr/bin/env node
import { runCli } from "create-boyeep/cli";

await runCli({ fixedTemplate: "next-bun", defaultProjectName: "my-next-app" });

