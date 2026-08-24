export const templates = [
  { id: "agent", name: "AI Agent", repo: "nextjs-python-ai-agent-kit", description: "Next.js + FastAPI agents, tools, structured output, sessions, and jobs" },
  { id: "rag", name: "RAG", repo: "nextjs-python-rag-kit", description: "Document ingestion, vector retrieval, grounded chat, and citations" },
  { id: "documents", name: "Document Intelligence", repo: "python-document-intelligence-kit", description: "Backend-only OCR adapters and validated structured extraction" },
  { id: "realtime", name: "Realtime Go", repo: "nextjs-go-realtime-kit", description: "Next.js + Go WebSocket rooms, presence, typing, and reconnect" },
  { id: "voice", name: "Voice Assistant", repo: "nextjs-python-voice-assistant-kit", description: "Microphone, speech recognition, streaming responses, and TTS" },
  { id: "worker", name: "Background Worker", repo: "python-background-worker-kit", description: "FastAPI + Celery + Redis jobs, retries, scheduling, and status" }
];

export function findTemplate(id) {
  return templates.find((template) => template.id === id);
}
