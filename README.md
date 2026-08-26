# create-boyeep

Create production-minded AI, realtime, and fullstack starters from the Boyeep
template collection.

```bash
npm create boyeep@latest
```

Or skip prompts:

```bash
npm create boyeep@latest my-rag-app -- --template rag --no-install
```

Each starter also has a focused package when you do not need the interactive
catalog:

```bash
npx @boyeep/nextjs-python-ai-agent-kit my-agent
npx @boyeep/nextjs-python-ai-chatbot-kit my-chatbot
npx @boyeep/nextjs-python-rag-kit my-rag-app
npx @boyeep/nextjs-python-computer-vision-kit my-vision-app
npx @boyeep/nextjs-python-voice-assistant-kit my-voice-app
npx @boyeep/nextjs-go-monorepo-kit my-go-app
npx @boyeep/nextjs-go-realtime-kit my-realtime-app
npx @boyeep/python-document-intelligence-kit my-document-api
npx @boyeep/python-computer-vision-api-kit my-vision-api
npx @boyeep/python-background-worker-kit my-worker-app
npx @boyeep/next-bun-kit my-next-app
```

Append `--no-install` to scaffold without installing dependencies.

## Templates

| ID | Stack | Included workflow |
| --- | --- | --- |
| `agent` | Next.js + FastAPI | tools, structured output, sessions, streaming, jobs |
| `chatbot` | Next.js + FastAPI | OpenAI-compatible streamed chat |
| `rag` | Next.js + FastAPI | ingestion, embeddings, retrieval, citations |
| `computer-vision` | Next.js + FastAPI | image and live-camera inference |
| `documents` | FastAPI | OCR boundary, classification, extraction, validation |
| `vision-api` | FastAPI | typed standalone OpenCV inference API |
| `go-monorepo` | Next.js + Go | auth, dashboard, PostgreSQL, and OpenAPI |
| `realtime` | Next.js + Go | WebSocket rooms, presence, typing, reconnect |
| `next-bun` | Next.js + Bun | minimal frontend, Tailwind, and Docker |
| `voice` | Next.js + FastAPI | microphone, STT, streamed response, TTS, interruption |
| `worker` | FastAPI + Celery | Redis queues, retries, scheduler, job status |

List the current catalog at any time:

```bash
npm create boyeep@latest -- --list
```

The CLI downloads the selected repository's `main` snapshot from GitHub. It
does not copy Git history or execute template code during extraction. It then
personalizes package names, creates local environment files from examples, and
optionally installs frontend and backend dependencies.

Requires Node.js 20 or newer.

## Development

```bash
npm install
npm run check
node ./bin/create-boyeep-kit.js demo --template rag --no-install
```

## Releases

The `Release npm packages` workflow publishes one coordinated version of the
CLI and every focused package to npmjs, mirrors the scoped packages to GitHub
Packages, commits the version bump, creates a `vX.Y.Z` tag, and creates a
GitHub Release. Existing versions are detected and skipped, so an interrupted
release can be rerun safely.

Configure the repository's `npm` environment with an `NPM_TOKEN` secret that
can publish `create-boyeep` and the `@boyeep` packages. Then run the workflow
manually with a semver value without the leading `v`.

## License

MIT
