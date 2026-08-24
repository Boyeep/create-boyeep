#!/usr/bin/env node
import { runCli } from "create-boyeep/cli";

await runCli({ fixedTemplate: "documents", defaultProjectName: "my-document-api" });

