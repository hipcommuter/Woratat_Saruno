/* ARCHITECT'S PATH — interactivity */
(() => {
  const GRID = 8;            // 8x8 isometric grid
  const TILE = 60;           // px per tile (pre-rotation)

  // ---------- pixel hero sprite ----------
  // 16x24 pixel art string. Letters map to colors.
  const HERO_PIXELS = [
    "       GG       ", // 0  hat gem
    "      pPPp      ", // 1
    "     pPPPPp     ", // 2  pointed hat
    "    pPPPPPPp    ", // 3
    "   bbbbbbbbbb   ", // 4  hat brim
    "     ssssss     ", // 5  forehead
    "     SssssS     ", // 6  eyes (left/right)
    "     ssssss     ", // 7  cheeks
    "    cccccccc    ", // 8  collar/cape top
    "    cmmmmmmc    ", // 9  shirt
    "    cmmGGmmc    ", //10  belt buckle gem
    "    cmmmmmmc    ", //11
    "   cBBBBBBBBc   ", //12  belt
    "   cmmmmmmmmc   ", //13
    "  ccmmmmmmmmcc  ", //14  cape spreading
    "  cmmmmmmmmmmc  ", //15
    " cccmmmmmmmmccc ", //16
    " ccccmmmmmmcccc ", //17
    "    pppp pppp   ", //18  legs
    "    pppp pppp   ", //19
    "    pppp pppp   ", //20
    "    pppp pppp   ", //21
    "   kkkkk kkkkk  ", //22  boots
    "   kkkkk kkkkk  ", //23
  ];
  const PALETTE = {
    G: "#ffcb3d", // gold gem
    P: "#8b6cff", // hat light
    p: "#5a3aa6", // hat dark / pant
    b: "#3d2a78", // hat brim
    s: "#f3c191", // skin
    S: "#241733", // eye
    e: "#f3c191", // skin around eye (same)
    c: "#4a2d8a", // cape outline
    m: "#8b6cff", // shirt/cape light
    B: "#1a0d28", // belt strap
    k: "#2a1810", // boots
  };

  function buildHeroSVG() {
    const rects = [];
    HERO_PIXELS.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch === " ") continue;
        const fill = PALETTE[ch];
        if (!fill) continue;
        rects.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}"/>`);
      }
    });
    return rects.join("");
  }
  document.getElementById("hero-sprite").innerHTML = buildHeroSVG();
  // re-use the same sprite on the worldmap hero
  const isoHero = document.getElementById("iso-hero");
  isoHero.innerHTML = `<svg viewBox="0 0 16 24" shape-rendering="crispEdges">${buildHeroSVG()}</svg>`;

  // ---------- isometric world ----------
  const grid  = document.getElementById("iso-grid");
  const nodes = document.getElementById("iso-nodes");

  // place tiles
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const t = document.createElement("div");
      t.className = "tile";
      t.style.left = (x * TILE) + "px";
      t.style.top  = (y * TILE) + "px";
      if (PATH_TILES.has(`${x},${y}`)) {
        t.classList.add("path");
      } else if (((x * 7 + y * 3) % 11) === 0) {
        // sparse trees on grass tiles, deterministic
        t.classList.add("has-tree");
      }
      grid.appendChild(t);
    }
  }

  // place quest nodes
  QUESTS.forEach((q, i) => {
    const n = document.createElement("button");
    n.className = "node";
    if (q.boss) n.classList.add("boss");
    n.style.left = (q.map.x * TILE) + "px";
    n.style.top  = (q.map.y * TILE) + "px";
    n.title = `Lv ${q.lv} · ${q.title}`;
    n.dataset.idx = String(i);
    n.addEventListener("click", () => selectQuest(i));
    nodes.appendChild(n);
  });

  // ---------- quest log ----------
  const list = document.getElementById("quest-list");
  QUESTS.forEach((q, i) => {
    const li = document.createElement("li");
    li.className = "quest" + (q.boss ? " boss" : "");
    li.dataset.idx = String(i);
    li.innerHTML = `
      <div class="lv">Lv ${q.lv}</div>
      <div>
        <h4>${q.title}</h4>
        <p>${q.summary}</p>
        <div class="tags">${q.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      </div>`;
    li.addEventListener("click", () => selectQuest(i));
    list.appendChild(li);
  });

  // ---------- rank codex ----------
  const rankList = document.getElementById("ranks");
  RANKS.forEach((r, i) => {
    const li = document.createElement("li");
    li.className = "rank";
    li.dataset.idx = String(i);
    li.innerHTML = `
      <h4>${r.name}</h4>
      <div class="lv-range">Lv ${r.from}${r.from === r.to ? "" : "-" + r.to}</div>
      <p>${r.blurb}</p>`;
    rankList.appendChild(li);
  });

  // ---------- state ----------
  const state = {
    level: 1,
    selected: 0,
  };

  function rankFor(level) {
    return RANKS.find(r => level >= r.from && level <= r.to) || RANKS[RANKS.length - 1];
  }

  function expForLevel(level) {
    return Math.floor(80 + level * 1.6);
  }

  // ---------- UI updates ----------
  function setLevel(lv) {
    lv = Math.max(1, Math.min(999, lv | 0));
    state.level = lv;

    document.getElementById("level-num").textContent = lv;
    document.getElementById("rank-name").textContent = rankFor(lv).name;

    const exp     = expForLevel(lv);
    const expCap  = expForLevel(lv) + 100;
    const expPct  = Math.round(100 * exp / expCap);
    document.getElementById("exp-fill").style.width = expPct + "%";
    document.getElementById("exp-text").textContent = `${exp} / ${expCap} EXP`;

    const hpMax   = 100 + lv * 2;
    const mpMax   = 60  + lv * 1.2 | 0;
    document.getElementById("hp-fill").style.width = "100%";
    document.getElementById("mp-fill").style.width = "100%";
    document.getElementById("hp-text").textContent = `${hpMax} / ${hpMax} HP`;
    document.getElementById("mp-text").textContent = `${mpMax} / ${mpMax} MP`;

    document.getElementById("lv-input").value  = lv;
    document.getElementById("lv-number").value = lv;

    // node + quest lock states
    document.querySelectorAll(".node").forEach(n => {
      const q = QUESTS[+n.dataset.idx];
      n.classList.toggle("locked",   lv < q.lv);
      n.classList.toggle("complete", lv >  q.lv);
    });
    document.querySelectorAll(".quest").forEach(li => {
      const q = QUESTS[+li.dataset.idx];
      li.classList.toggle("locked", lv < q.lv);
    });

    // ranks codex highlight
    document.querySelectorAll(".rank").forEach(li => {
      const r = RANKS[+li.dataset.idx];
      li.classList.toggle("current", lv >= r.from && lv <= r.to);
      li.classList.toggle("passed",  lv >  r.to);
    });

    // park hero on the nearest reached quest tile
    let target = QUESTS[0];
    for (const q of QUESTS) if (lv >= q.lv) target = q;
    moveHeroTo(target.map.x, target.map.y);
  }

  function moveHeroTo(x, y) {
    isoHero.style.left = (x * TILE) + "px";
    isoHero.style.top  = (y * TILE) + "px";
  }

  // ---------- dialog typewriter ----------
  let typeTimer = null;
  function say(speaker, text) {
    document.querySelector(".speaker").textContent = "▼ " + speaker;
    const out = document.getElementById("dialog-text");
    out.textContent = "";
    if (typeTimer) clearInterval(typeTimer);
    let i = 0;
    typeTimer = setInterval(() => {
      out.textContent += text[i++] || "";
      if (i >= text.length) clearInterval(typeTimer);
    }, 14);
  }

  // ---------- selection ----------
  function selectQuest(i) {
    state.selected = i;
    const q = QUESTS[i];

    document.querySelectorAll(".quest").forEach(li => {
      li.classList.toggle("active", +li.dataset.idx === i);
    });
    document.querySelectorAll(".node").forEach(n => {
      n.classList.toggle("active", +n.dataset.idx === i);
    });

    const status = state.level >= q.lv ? "AVAILABLE" : `LOCKED · need Lv ${q.lv}`;
    const speaker = q.boss ? "FINAL BOSS" : "AI MENTOR";
    const text =
      `[Lv ${q.lv}] ${q.title}  —  ${status}\n` +
      `${q.summary}\n` +
      `Objective: ${q.objective}\n` +
      `Reward: ${q.reward}`;
    say(speaker, text);

    // also nudge the on-map hero toward the selected quest if reached
    if (state.level >= q.lv) moveHeroTo(q.map.x, q.map.y);

    // scroll quest into view in the log
    const li = document.querySelector(`.quest[data-idx="${i}"]`);
    if (li) li.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // ---------- inputs ----------
  document.getElementById("lv-input").addEventListener("input", e => setLevel(+e.target.value));
  document.getElementById("lv-number").addEventListener("change", e => setLevel(+e.target.value));

  document.addEventListener("keydown", e => {
    if (e.target.matches("input, textarea")) return;
    if (e.key === "ArrowDown") { selectQuest(Math.min(QUESTS.length - 1, state.selected + 1)); e.preventDefault(); }
    if (e.key === "ArrowUp")   { selectQuest(Math.max(0, state.selected - 1)); e.preventDefault(); }
  });

  // ---------- boot ----------
  setLevel(1);
  selectQuest(0);
})();
