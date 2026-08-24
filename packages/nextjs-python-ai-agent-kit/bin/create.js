#!/usr/bin/env node
import { runCli } from "create-boyeep/cli";

await runCli({ fixedTemplate: "agent", defaultProjectName: "my-ai-agent" });

