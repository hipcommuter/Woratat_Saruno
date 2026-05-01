// Quest + rank data for ARCHITECT'S PATH.
// Sourced from public AI/software-architect roadmap material (2026):
// - the-ai-corner.com "AI engineer roadmap 2026: 5 production projects"
// - towardsdatascience.com "A Realistic Roadmap to Start an AI Career in 2026"
// - scaler.com "Generative AI Roadmap 2026"
// Levels 1-999 are partitioned into 15 rank tiers; ~22 representative quests
// are placed across the curve.

const RANKS = [
  { from: 1,   to: 10,  name: "Apprentice Coder",     blurb: "Grasp the runes of syntax." },
  { from: 11,  to: 30,  name: "Script Mage",          blurb: "Bind tasks with small spells." },
  { from: 31,  to: 60,  name: "Data Acolyte",         blurb: "Read tables, summon charts." },
  { from: 61,  to: 100, name: "ML Knight",            blurb: "First classifiers, first regressors." },
  { from: 101, to: 150, name: "API Ranger",           blurb: "Forge endpoints across realms." },
  { from: 151, to: 200, name: "Cloud Druid",          blurb: "Tame containers, summon clusters." },
  { from: 201, to: 300, name: "Prompt Sage",          blurb: "Speak fluent LLM." },
  { from: 301, to: 400, name: "RAG Sorcerer",         blurb: "Bind oracles to private tomes." },
  { from: 401, to: 500, name: "Agent Summoner",       blurb: "Conjure tool-using minds." },
  { from: 501, to: 600, name: "Fine-Tune Alchemist",  blurb: "Reshape weights with LoRA." },
  { from: 601, to: 700, name: "Multimodal Warlock",   blurb: "Vision, audio, video at command." },
  { from: 701, to: 800, name: "Systems Sage",         blurb: "Distribute, scale, observe." },
  { from: 801, to: 900, name: "AI Architect",         blurb: "Design platforms, not features." },
  { from: 901, to: 998, name: "Grand Architect",      blurb: "Govern autonomous orgs of agents." },
  { from: 999, to: 999, name: "The Singularity",      blurb: "The final boss of builders." },
];

const QUESTS = [
  {
    lv: 1, title: "Hello, Realm",
    summary: "Print your first line of code. Bind your terminal as a familiar.",
    objective: "Run a 'Hello, world' script in any language.",
    reward: "+100 EXP · 'Keyboard +1'",
    tags: ["python", "shell"],
    map: { x: 0, y: 7 },
  },
  {
    lv: 5, title: "The Number Diviner",
    summary: "Build a number-guessing CLI. Learn loops and randomness.",
    objective: "Console game with input + win condition.",
    reward: "+250 EXP · 'Loop Charm'",
    tags: ["python", "cli"],
    map: { x: 1, y: 7 },
  },
  {
    lv: 12, title: "Task Tomes",
    summary: "A tiny todo CLI persisted to JSON. Ship it as a binary.",
    objective: "Add/list/done with file persistence.",
    reward: "+600 EXP · 'Persistence Rune'",
    tags: ["cli", "json"],
    map: { x: 2, y: 7 },
  },
  {
    lv: 25, title: "Crawler of Lost News",
    summary: "Scrape headlines from a news site, dedupe, save daily.",
    objective: "Cron-able scraper with HTML parser.",
    reward: "+1k EXP · 'Spider Cloak'",
    tags: ["python", "scraping"],
    map: { x: 2, y: 6 },
  },
  {
    lv: 40, title: "Ledger of Self",
    summary: "Visualize a year of your own data (steps, sleep, spend).",
    objective: "Notebook with 3+ charts and 1 insight.",
    reward: "+1.5k EXP · 'Chart Lens'",
    tags: ["pandas", "matplotlib"],
    map: { x: 2, y: 5 },
  },
  {
    lv: 55, title: "Spam, Begone",
    summary: "Train an email spam classifier on a public dataset.",
    objective: "TF-IDF + logistic regression, F1 > 0.90.",
    reward: "+2k EXP · 'Filter Sigil'",
    tags: ["sklearn", "ml"],
    map: { x: 3, y: 5 },
  },
  {
    lv: 80, title: "Price Oracle of Houses",
    summary: "Predict housing prices. Compare 3 models, explain features.",
    objective: "Regression with held-out RMSE + SHAP.",
    reward: "+3k EXP · 'Oracle Fragment'",
    tags: ["regression", "shap"],
    map: { x: 4, y: 5 },
  },
  {
    lv: 110, title: "The Recipe Vault API",
    summary: "REST API + auth + DB for a recipe catalog.",
    objective: "FastAPI/Express + Postgres + JWT + tests.",
    reward: "+5k EXP · 'API Keychain'",
    tags: ["fastapi", "postgres"],
    map: { x: 5, y: 5 },
  },
  {
    lv: 145, title: "Containment Ritual",
    summary: "Dockerize a service and deploy it to a tiny VPS.",
    objective: "Multi-stage Dockerfile + compose + healthcheck.",
    reward: "+8k EXP · 'Whale Totem'",
    tags: ["docker", "devops"],
    map: { x: 5, y: 4 },
  },
  {
    lv: 180, title: "Cluster of Whispers",
    summary: "Run a 3-service app on Kubernetes with ingress + secrets.",
    objective: "Helm chart + readiness + horizontal autoscale.",
    reward: "+12k EXP · 'Helm of Orchestration'",
    tags: ["k8s", "helm"],
    map: { x: 5, y: 3 },
  },
  {
    lv: 220, title: "Chat with the PDF Ghost",
    summary: "Upload a PDF, ask questions, get cited answers.",
    objective: "Embeddings + chunking + LLM call + citations.",
    reward: "+18k EXP · 'Embedding Stone'",
    tags: ["llm", "rag"],
    map: { x: 6, y: 3 },
  },
  {
    lv: 260, title: "Smart Career Compass",
    summary: "Resume + jobs in, ranked matches + tailored cover letters out.",
    objective: "Structured ML score + GenAI rewrite, evaluated.",
    reward: "+22k EXP · 'Compass of Paths'",
    tags: ["llm", "ml"],
    map: { x: 7, y: 3 },
  },
  {
    lv: 320, title: "Wiki Oracle (RAG)",
    summary: "Production RAG over a company wiki with eval harness.",
    objective: "Hybrid search + reranker + groundedness eval.",
    reward: "+30k EXP · 'Tome of Sources'",
    tags: ["rag", "eval"],
    map: { x: 7, y: 2 },
  },
  {
    lv: 380, title: "Self-Improving Codesmith",
    summary: "An agent that reads tests, writes code, retries until green.",
    objective: "Agent loop + tool use + sandbox + guardrails.",
    reward: "+40k EXP · 'Anvil of Iteration'",
    tags: ["agent", "tools"],
    map: { x: 7, y: 1 },
  },
  {
    lv: 450, title: "Council of Tools",
    summary: "Multi-tool research agent: web, code, files, calendar.",
    objective: "Plan-execute loop + memory + budget.",
    reward: "+55k EXP · 'Ring of Convocation'",
    tags: ["agent", "memory"],
    map: { x: 7, y: 0 },
  },
  {
    lv: 530, title: "LoRA of the Lesser Beast",
    summary: "Fine-tune a 7B model on a niche dataset; ship a GGUF.",
    objective: "Eval vs base, latency budget, license sanity.",
    reward: "+70k EXP · 'Alchemist's Apron'",
    tags: ["finetune", "lora"],
    map: { x: 6, y: 0 },
  },
  {
    lv: 620, title: "Cutter of Moving Pictures",
    summary: "Multimodal video editor agent: transcribe, summarize, splice.",
    objective: "ASR + scene detection + LLM cuts + render.",
    reward: "+90k EXP · 'Lens of the Warlock'",
    tags: ["multimodal", "video"],
    map: { x: 5, y: 0 },
  },
  {
    lv: 700, title: "Life OS",
    summary: "A personal agent across calendar, mail, notes, finance.",
    objective: "Auth + permissions + audit log + recovery.",
    reward: "+120k EXP · 'Sigil of the Self'",
    tags: ["agent", "platform"],
    map: { x: 4, y: 0 },
  },
  {
    lv: 800, title: "Autonomous Workflow Forge",
    summary: "Replace one full enterprise workflow end-to-end with agents.",
    objective: "SLA + cost dashboard + human-in-loop fallback.",
    reward: "+200k EXP · 'Forge Hammer'",
    tags: ["agents", "ops"],
    map: { x: 3, y: 0 },
  },
  {
    lv: 900, title: "AI OS for a Startup",
    summary: "Design the agent platform a 50-person company runs on.",
    objective: "Identity, memory, eval, governance, billing.",
    reward: "+400k EXP · 'Architect's Crown'",
    tags: ["platform", "design"],
    map: { x: 2, y: 0 },
  },
  {
    lv: 950, title: "The Living Codex",
    summary: "A self-documenting, self-healing service mesh of agents.",
    objective: "Drift detection + auto-PR + rollback ritual.",
    reward: "+700k EXP · 'Codex Eternal'",
    tags: ["meta", "research"],
    map: { x: 1, y: 0 },
  },
  {
    lv: 999, title: "The Singularity Engine",
    summary: "Final boss. Build the system that builds the next system.",
    objective: "Recursive self-improvement, contained and aligned.",
    reward: "Title: 'Architect Eternal'",
    tags: ["boss"],
    boss: true,
    map: { x: 0, y: 0 },
  },
];

// Tiles are laid out on a 8x8 grid. The path is the union of all quest map cells.
const PATH_TILES = (() => {
  const set = new Set(QUESTS.map(q => `${q.map.x},${q.map.y}`));
  // Add a few connector tiles so the road looks continuous.
  const extras = ["3,7","4,7","5,7","6,7","6,5","6,4","6,2","6,1","4,3","3,3","2,3","2,2","2,1","3,0","5,0"];
  extras.forEach(e => set.add(e));
  return set;
})();

window.RANKS = RANKS;
window.QUESTS = QUESTS;
window.PATH_TILES = PATH_TILES;
