#!/usr/bin/env node
import { runCli } from "create-boyeep/cli";

await runCli({ fixedTemplate: "voice", defaultProjectName: "my-voice-assistant" });

