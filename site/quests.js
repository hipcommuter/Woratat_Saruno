// ARCHITECT'S PATH — quest + rank data
// Audience: people new to AI. The "quests" are not coding tasks; they are
// life/work upgrades you unlock as you adopt AI more deeply. Built so 12
// milestones map to a 30-minute talk (~2.5 min per stop).

const RANKS = [
  { from: 1,   to: 10,  name: "AI Curious",          blurb: "First contact. AI is your sidekick." },
  { from: 11,  to: 30,  name: "Daily AI User",       blurb: "AI is part of your routine." },
  { from: 31,  to: 80,  name: "Power Prompter",      blurb: "You ask better, you get better." },
  { from: 81,  to: 150, name: "Workflow Booster",    blurb: "Tasks that took hours take minutes." },
  { from: 151, to: 300, name: "Knowledge Keeper",    blurb: "AI knows YOUR files, notes, decisions." },
  { from: 301, to: 500, name: "Workflow Designer",   blurb: "AI runs multi-step jobs for you." },
  { from: 501, to: 800, name: "Team Orchestrator",   blurb: "Several AIs working together." },
  { from: 801, to: 998, name: "AI-Native Leader",    blurb: "Your work is rebuilt around AI." },
  { from: 999, to: 999, name: "The Future of Work",  blurb: "You + AI = a small team." },
];

// Each quest is one stop in the 30-minute presentation.
// timeSaved is illustrative; tweak to your audience.
const QUESTS = [
  {
    lv: 1,
    title: "Ask, Don't Search",
    tagline: "Stop hunting through 10 browser tabs.",
    summary: "Ask an AI a clear question and get a synthesized answer instead of a list of links.",
    whatChanges: "You stop scrolling. The AI reads, compares, and explains.",
    timeSaved: "~30 min/day",
    tools: ["ChatGPT", "Claude", "Gemini", "Perplexity"],
    talkingPoints: [
      "Demo: ask 'compare iPhone 15 vs 16 for a photographer'",
      "AI gives a side-by-side, not 12 blue links",
      "Tip: end every question with 'in plain language'",
    ],
    map: { x: 0, y: 7 },
  },
  {
    lv: 5,
    title: "The First Draft",
    tagline: "Never start from a blank page again.",
    summary: "AI writes the first version of any email, message, report, or speech. You only edit.",
    whatChanges: "You become an editor, not a writer. 5x faster output.",
    timeSaved: "~1 hr/day",
    tools: ["ChatGPT", "Claude", "Microsoft Copilot", "Gmail Smart Compose"],
    talkingPoints: [
      "Demo: 'Write a polite email asking for a deadline extension.'",
      "Set tone: 'casual / formal / firm but kind'",
      "Reuse a personal style guide so it sounds like YOU",
    ],
    map: { x: 1, y: 7 },
  },
  {
    lv: 15,
    title: "Read For Me",
    tagline: "30 seconds for a 30-page document.",
    summary: "Drop in a long PDF, contract, or article. Ask 'what matters?' Get bullets, risks, action items.",
    whatChanges: "No more skimming dread. You decide based on the gist.",
    timeSaved: "~2 hrs per long doc",
    tools: ["NotebookLM", "Claude (file upload)", "ChatGPT (PDF)", "Adobe Acrobat AI"],
    talkingPoints: [
      "Demo: upload a 20-page contract and ask 'what should I push back on?'",
      "Ask for: TL;DR, risks, missing info, follow-up questions",
      "Tip: always cross-check critical numbers with the source",
    ],
    map: { x: 2, y: 7 },
  },
  {
    lv: 30,
    title: "Explain Like I'm New",
    tagline: "Anything jargon? Translated.",
    summary: "Errors, contracts, medical terms, legal text — paste it, get plain language back.",
    whatChanges: "You stop nodding politely in meetings. You actually understand.",
    timeSaved: "Hours of confusion / week",
    tools: ["ChatGPT", "Claude", "Gemini"],
    talkingPoints: [
      "Demo: paste a tax form clause, ask 'explain like I'm 12'",
      "Ask follow-ups: 'what happens if I ignore this?'",
      "Use it before EVERY meeting you don't fully follow",
    ],
    map: { x: 2, y: 6 },
  },
  {
    lv: 60,
    title: "Slides In Five Minutes",
    tagline: "Describe it. They'll build it.",
    summary: "Tell the AI your topic and audience. Get a deck, talking points, even speaker notes.",
    whatChanges: "Slide nights are over. You arrive with a draft, not a blank file.",
    timeSaved: "~3 hrs/deck",
    tools: ["Gamma", "Beautiful.ai", "Tome", "Microsoft Copilot in PowerPoint"],
    talkingPoints: [
      "Demo: 'A 10-slide deck pitching our team's Q3 results to execs.'",
      "Iterate: 'Make slide 4 a 2x2 matrix instead.'",
      "Stay in control: AI drafts, you tell the story",
    ],
    map: { x: 2, y: 5 },
  },
  {
    lv: 100,
    title: "Spreadsheet Whisperer",
    tagline: "Talk to your data. No formulas.",
    summary: "Drop a CSV, ask 'what's the trend in sales?' Get a chart and a 3-line summary.",
    whatChanges: "Anyone can be an analyst. The AI does VLOOKUP for you.",
    timeSaved: "~4 hrs / report",
    tools: ["ChatGPT (Advanced Data Analysis)", "Claude", "Microsoft Copilot in Excel", "Julius AI"],
    talkingPoints: [
      "Demo: upload sales.csv, ask 'top 3 products by growth, with chart'",
      "Ask for: outliers, anomalies, 'what's surprising?'",
      "Always sanity-check totals against a known number",
    ],
    map: { x: 3, y: 5 },
  },
  {
    lv: 150,
    title: "The Image Studio",
    tagline: "First-draft visuals — instantly.",
    summary: "Generate logos, mockups, social posts, product photos, illustrations.",
    whatChanges: "You stop waiting on designers for ideas. They polish your draft.",
    timeSaved: "Days of back-and-forth",
    tools: ["Midjourney", "DALL-E (in ChatGPT)", "Adobe Firefly", "Canva Magic Studio", "Ideogram"],
    talkingPoints: [
      "Demo: 'Isometric 3D logo for an architect, gold accent, dark blue.'",
      "Iterate by 'edit' — change colors, add elements",
      "Be careful: rights, brand consistency, real faces",
    ],
    map: { x: 4, y: 5 },
  },
  {
    lv: 250,
    title: "The Memory Vault",
    tagline: "AI knows YOUR stuff.",
    summary: "Upload your meeting notes, docs, wiki. Ask 'what did we decide about pricing?'",
    whatChanges: "You stop asking 'where's that file?' Your team's brain is searchable.",
    timeSaved: "~5 hrs/week",
    tools: ["NotebookLM", "Claude Projects", "ChatGPT custom GPTs", "Glean", "Notion AI"],
    talkingPoints: [
      "Demo: a 'Project Vault' with 30 files; ask 3 questions",
      "Always cite sources — make AI show WHERE it found the answer",
      "Privacy: confirm where files are stored before uploading",
    ],
    map: { x: 5, y: 5 },
  },
  {
    lv: 400,
    title: "The Inbox Tamer",
    tagline: "Your email runs itself.",
    summary: "AI sorts emails, drafts replies, schedules meetings, escalates only what matters.",
    whatChanges: "You read 20 emails a day instead of 200. Reply quality goes up.",
    timeSaved: "~1.5 hrs/day",
    tools: ["Superhuman AI", "Shortwave", "Microsoft Copilot in Outlook", "Gemini in Gmail"],
    talkingPoints: [
      "Demo: 'auto-categorize this inbox: urgent, FYI, sales pitch, ignore'",
      "Set rules in plain English: 'Always draft a reply to my boss'",
      "Keep humans in the loop for anything legal/financial",
    ],
    map: { x: 5, y: 4 },
  },
  {
    lv: 600,
    title: "The Personal Workflow",
    tagline: "Describe the routine. It runs.",
    summary: "An AI 'agent' chains steps for you: gather data → write a doc → notify team → schedule follow-up.",
    whatChanges: "Repeating tasks just... happen. You supervise instead of do.",
    timeSaved: "~5 hrs/week per workflow",
    tools: ["Zapier AI", "Make.com", "n8n", "ChatGPT Tasks", "Claude (Computer Use)"],
    talkingPoints: [
      "Demo: 'Every Friday, summarize my week from calendar + email, send to my notebook.'",
      "Start with ONE workflow; expand only when it's reliable",
      "Always add a 'human review' step at the end",
    ],
    map: { x: 5, y: 3 },
  },
  {
    lv: 800,
    title: "Department In A Box",
    tagline: "Whole functions, AI-supervised.",
    summary: "Customer support, analytics, content, scheduling — handled by AIs you supervise.",
    whatChanges: "A 5-person team can do the work of 50. You hire for judgment, not labor.",
    timeSaved: "Re-allocates whole roles",
    tools: ["Intercom Fin", "Decagon", "Sierra", "Lindy", "Crew AI", "Claude/GPT agents"],
    talkingPoints: [
      "Demo: a support bot answering 80% of tickets, escalating 20%",
      "Measure: deflection rate, customer satisfaction, hours saved",
      "Talk about: governance, audit logs, when to overrule AI",
    ],
    map: { x: 6, y: 3 },
  },
  {
    lv: 999,
    title: "The AI-Native You",
    tagline: "Your job: judgment, taste, relationships.",
    summary: "AI does the work. You decide what's worth doing, choose the direction, build trust.",
    whatChanges: "You're not faster — you're operating at a different altitude.",
    timeSaved: "Reclaim a workweek",
    tools: ["Whatever fits the job — you orchestrate them"],
    talkingPoints: [
      "Close on: what stays human? (vision, ethics, taste, care)",
      "Audience action: pick ONE level above where you are today",
      "Give them a 7-day starter checklist to walk out with",
    ],
    boss: true,
    map: { x: 7, y: 3 },
  },
];

// Path tiles = quest tiles + connectors so the road looks continuous.
const PATH_TILES = (() => {
  const set = new Set(QUESTS.map(q => `${q.map.x},${q.map.y}`));
  const connectors = ["3,7","4,7","5,7","6,7","6,5","6,4","6,2","6,1","4,3","3,3","2,3","2,2","2,1","3,0","5,0","7,4","7,5","7,6"];
  connectors.forEach(c => set.add(c));
  return set;
})();

window.RANKS = RANKS;
window.QUESTS = QUESTS;
window.PATH_TILES = PATH_TILES;
