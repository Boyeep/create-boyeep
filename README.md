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
| `rag` | Next.js + FastAPI | ingestion, embeddings, retrieval, citations |
| `documents` | FastAPI | OCR boundary, classification, extraction, validation |
| `realtime` | Next.js + Go | WebSocket rooms, presence, typing, reconnect |
| `voice` | Next.js + FastAPI | microphone, STT, streamed response, TTS, interruption |
| `worker` | FastAPI + Celery | Redis queues, retries, scheduler, job status |

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
