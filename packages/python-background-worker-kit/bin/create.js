#!/usr/bin/env node
import { runCli } from "create-boyeep/cli";

await runCli({ fixedTemplate: "worker", defaultProjectName: "my-worker-app" });

