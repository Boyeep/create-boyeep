#!/usr/bin/env node
import { runCli } from "create-boyeep/cli";

await runCli({ fixedTemplate: "rag", defaultProjectName: "my-rag-app" });

