#!/usr/bin/env node
import { runCli } from "create-boyeep/cli";

await runCli({ fixedTemplate: "go-monorepo", defaultProjectName: "my-go-app" });

