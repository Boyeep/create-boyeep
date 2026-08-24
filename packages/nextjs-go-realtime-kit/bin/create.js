#!/usr/bin/env node
import { runCli } from "create-boyeep/cli";

await runCli({ fixedTemplate: "realtime", defaultProjectName: "my-realtime-app" });

