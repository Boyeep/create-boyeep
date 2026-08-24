const pythonFullstack = [
  { command: "npm", args: ["install"], cwd: "frontend" },
  { command: "python", args: ["-m", "pip", "install", "-e", ".[dev]"], cwd: "backend" }
];
const pythonBackend = [{ command: "python", args: ["-m", "pip", "install", "-e", ".[dev]"], cwd: "." }];
const goFullstack = [
  { command: "npm", args: ["install"], cwd: "." },
  { command: "npm", args: ["install"], cwd: "frontend" }
];

export const templates = [
  { id: "agent", name: "AI Agent", repo: "nextjs-python-ai-agent-kit", description: "Next.js + FastAPI agents, tools, structured output, sessions, and jobs", install: pythonFullstack },
  { id: "chatbot", name: "AI Chatbot", repo: "nextjs-python-ai-chatbot-kit", description: "Next.js + FastAPI streaming chat with an OpenAI-compatible provider", install: pythonFullstack },
  { id: "rag", name: "RAG", repo: "nextjs-python-rag-kit", description: "Document ingestion, vector retrieval, grounded chat, and citations", install: pythonFullstack },
  { id: "computer-vision", name: "Computer Vision", repo: "nextjs-python-computer-vision-kit", description: "Next.js + FastAPI image upload and live camera inference", install: pythonFullstack },
  { id: "documents", name: "Document Intelligence", repo: "python-document-intelligence-kit", description: "Backend-only OCR adapters and validated structured extraction", install: pythonBackend },
  { id: "vision-api", name: "Computer Vision API", repo: "python-computer-vision-api-kit", description: "Backend-only typed OpenCV inference API", install: pythonBackend },
  { id: "go-monorepo", name: "Next.js + Go Monorepo", repo: "nextjs-go-monorepo-kit", description: "Auth, dashboard, PostgreSQL, OpenAPI, and Docker foundation", install: goFullstack },
  { id: "realtime", name: "Realtime Go", repo: "nextjs-go-realtime-kit", description: "Next.js + Go WebSocket rooms, presence, typing, and reconnect", install: goFullstack },
  { id: "next-bun", name: "Next.js + Bun", repo: "next-bun-kit", description: "Minimal Next.js frontend powered by Bun and Tailwind CSS", install: [{ command: "bun", args: ["install"], cwd: "." }] },
  { id: "voice", name: "Voice Assistant", repo: "nextjs-python-voice-assistant-kit", description: "Microphone, speech recognition, streaming responses, and TTS", install: pythonFullstack },
  { id: "worker", name: "Background Worker", repo: "python-background-worker-kit", description: "FastAPI + Celery + Redis jobs, retries, scheduling, and status", install: pythonBackend }
];

export function findTemplate(id) {
  return templates.find((template) => template.id === id);
}
