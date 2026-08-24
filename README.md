# create-boyeep-kit

Create production-minded AI, realtime, and backend starters from the Boyeep
template collection.

```bash
npx create-boyeep-kit@latest
```

Or skip prompts:

```bash
npx create-boyeep-kit my-rag-app --template rag --no-install
```

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
npx create-boyeep-kit@latest --list
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

## License

MIT
