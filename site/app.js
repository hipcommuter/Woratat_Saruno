/* THE AI PATH — interactivity, voxel character, talk outline */
(() => {
  const GRID = 8;
  const TILE = 60;

  // ---------- outfit progression (level -> palette + accessories) ----------
  function outfitFor(level) {
    const o = {
      skin:  "#f3c191",
      hair:  "#5a2d0c",
      shirt: "#d8d6e0",  // plain white tee
      pants: "#2c4a8a",
      shoe:  "#1a0d28",
      cape:  null,
      accessories: [],
      label: "Plain explorer",
    };
    const inv = ["\u{1F464} Plain explorer"];

    if (level >= 11) {
      o.shirt = "#6cdcff";
      inv.push("\u{1F4D3} Notebook in hand");
      o.label = "Daily AI user";
    }
    if (level >= 31) {
      o.accessories.push("hat");
      inv.push("\u{1F3A9} Adventurer's cap");
      o.label = "Power prompter";
    }
    if (level >= 81) {
      o.shirt = "#c490ff";
      inv.push("\u{1F9BA} Workshop apron");
      o.label = "Workflow booster";
    }
    if (level >= 151) {
      o.cape = "#6e3ec4";
      o.accessories.push("cape");
      inv.push("\u{1F9E3} Mentor's cape");
      o.label = "Knowledge keeper";
    }
    if (level >= 301) {
      o.accessories.push("companion");
      inv.push("\u{1F916} AI companion");
      o.label = "Workflow designer";
    }
    if (level >= 501) {
      o.shirt = "#ffcb3d";
      o.pants = "#7a5500";
      inv.push("\u{1F6E1}  Gold-trimmed armor");
      o.label = "Team orchestrator";
    }
    if (level >= 801) {
      o.accessories.push("crown");
      inv.push("\u{1F451} Architect's crown");
      o.label = "AI-native leader";
    }
    if (level >= 999) {
      o.accessories.push("halo");
      o.accessories.push("aura");
      inv.push("\u{2728} Halo of mastery");
      o.label = "The Future of Work";
    }
    o.inventory = inv;
    return o;
  }

  // ---------- 3D cube factory (Minecraft-style) ----------
  function cube(w, h, d, faces, opts = {}) {
    const c = document.createElement("div");
    c.className = "cube" + (opts.cls ? " " + opts.cls : "");
    function mk(side, fw, fh, t, extra) {
      const f = document.createElement("div");
      f.className = "face face-" + side + (extra ? " " + extra : "");
      f.style.width  = fw + "px";
      f.style.height = fh + "px";
      const fill = faces[side];
      if (fill) f.style.backgroundColor = fill;
      f.style.transform = t;
      c.appendChild(f);
    }
    mk("front",  w, h, `translateZ(${ d/2}px) translate(${-w/2}px, ${-h/2}px)`, faces.frontClass);
    mk("back",   w, h, `rotateY(180deg) translateZ(${ d/2}px) translate(${-w/2}px, ${-h/2}px)`);
    mk("right",  d, h, `rotateY(90deg)  translateZ(${ w/2}px) translate(${-d/2}px, ${-h/2}px)`);
    mk("left",   d, h, `rotateY(-90deg) translateZ(${ w/2}px) translate(${-d/2}px, ${-h/2}px)`);
    mk("top",    w, d, `rotateX(-90deg) translateZ(${ h/2}px) translate(${-w/2}px, ${-d/2}px)`);
    mk("bottom", w, d, `rotateX(90deg)  translateZ(${ h/2}px) translate(${-w/2}px, ${-d/2}px)`);
    return c;
  }
  function place(el, x, y, z) {
    el.style.position  = "absolute";
    el.style.left = "0"; el.style.top = "0";
    el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
  }

  // ---------- build the voxel character ----------
  function buildMCChar(o) {
    const root = document.getElementById("mc-char");
    root.innerHTML = "";
    root.classList.toggle("aura", o.accessories.includes("aura"));

    // head
    const head = cube(24, 24, 24, {
      front: o.skin, back: o.hair, left: o.skin, right: o.skin,
      top: o.hair, bottom: o.skin, frontClass: "face-head-front",
    });
    head.style.setProperty("--head-fill", o.skin);
    place(head, 0, -54, 0);
    root.appendChild(head);

    // torso
    const torso = cube(24, 36, 12, {
      front: o.shirt, back: o.shirt, left: o.shirt,
      right: o.shirt, top: o.shirt, bottom: o.shirt,
    });
    place(torso, 0, -24, 0);
    root.appendChild(torso);

    // arms
    const armR = cube(10, 36, 10, {
      front: o.shirt, back: o.shirt, left: o.shirt,
      right: o.shirt, top: o.shirt, bottom: o.skin,
    });
    place(armR, 17, -24, 0);
    root.appendChild(armR);

    const armL = cube(10, 36, 10, {
      front: o.shirt, back: o.shirt, left: o.shirt,
      right: o.shirt, top: o.shirt, bottom: o.skin,
    });
    place(armL, -17, -24, 0);
    root.appendChild(armL);

    // legs
    const legR = cube(12, 36, 12, {
      front: o.pants, back: o.pants, left: o.pants,
      right: o.pants, top: o.pants, bottom: o.shoe,
    });
    place(legR, 6, 12, 0);
    root.appendChild(legR);

    const legL = cube(12, 36, 12, {
      front: o.pants, back: o.pants, left: o.pants,
      right: o.pants, top: o.pants, bottom: o.shoe,
    });
    place(legL, -6, 12, 0);
    root.appendChild(legL);

    // ----- accessories -----
    if (o.accessories.includes("hat")) {
      const hat = cube(26, 6, 26, {
        front: "#5a3aa6", back: "#5a3aa6", left: "#5a3aa6",
        right: "#5a3aa6", top: "#7a5dd0", bottom: "#3d2a78",
      });
      place(hat, 0, -69, 0);
      root.appendChild(hat);
      const brim = cube(30, 2, 30, {
        front: "#3d2a78", back: "#3d2a78", left: "#3d2a78",
        right: "#3d2a78", top: "#5a3aa6", bottom: "#3d2a78",
      });
      place(brim, 0, -64, 0);
      root.appendChild(brim);
    }
    if (o.accessories.includes("cape")) {
      const cape = cube(22, 44, 1, {
        front: o.cape || "#6e3ec4", back: o.cape || "#6e3ec4",
        left: o.cape || "#6e3ec4", right: o.cape || "#6e3ec4",
        top: o.cape || "#6e3ec4", bottom: "#3a1f6c",
      }, { cls: "cape-cube" });
      place(cape, 0, -18, -7);
      root.appendChild(cape);
    }
    if (o.accessories.includes("crown")) {
      const crown = cube(26, 4, 26, {
        front: "#ffcb3d", back: "#ffcb3d", left: "#ffcb3d",
        right: "#ffcb3d", top: "#ffe066", bottom: "#a8761c",
      }, { cls: "crown-cube" });
      place(crown, 0, -68, 0);
      root.appendChild(crown);
      // four little gold spikes
      [[-9, 0], [-3, 0], [3, 0], [9, 0]].forEach(([x, z]) => {
        const spike = cube(3, 5, 3, {
          front: "#ffe066", back: "#ffe066", left: "#a8761c",
          right: "#ffe066", top: "#ffe066", bottom: "#a8761c",
        });
        place(spike, x, -73, z);
        root.appendChild(spike);
      });
    }
    if (o.accessories.includes("halo")) {
      const halo = document.createElement("div");
      halo.className = "halo";
      root.appendChild(halo);
    }
    if (o.accessories.includes("companion")) {
      const comp = cube(10, 10, 10, {
        front: "#6cdcff", back: "#2c6dbf", left: "#3d8fdc",
        right: "#3d8fdc", top: "#a3e7ff", bottom: "#1a4a8a",
      }, { cls: "companion" });
      place(comp, 36, -36, 0);
      root.appendChild(comp);
    }
  }

  // ---------- build the small front-view hero sprite for the map ----------
  function buildIsoHeroSVG(o) {
    // viewBox padded for hat/cape/crown
    const rects = [];
    const box = (x, y, w, h, c) => rects.push(
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`
    );
    // cape behind torso
    if (o.accessories.includes("cape")) box(7, 8, 10, 18, o.cape || "#6e3ec4");
    // body
    // head
    box(8, 0, 8, 8, o.skin);
    box(8, 0, 8, 1, o.hair);
    box(10, 3, 1, 1, "#1a0d28");
    box(13, 3, 1, 1, "#1a0d28");
    box(11, 5, 2, 1, "#5a2a2a");
    // torso
    box(8, 8, 8, 10, o.shirt);
    // arms
    box(4, 8, 4, 4, o.shirt); box(4, 12, 4, 6, o.skin);
    box(16, 8, 4, 4, o.shirt); box(16, 12, 4, 6, o.skin);
    // legs
    box(8, 18, 4, 8, o.pants);
    box(12, 18, 4, 8, o.pants);
    box(8, 25, 4, 1, o.shoe); box(12, 25, 4, 1, o.shoe);
    // accessories
    if (o.accessories.includes("hat"))   box(7, -3, 10, 4, "#5a3aa6");
    if (o.accessories.includes("crown")) box(7, -2, 10, 3, "#ffcb3d");
    if (o.accessories.includes("halo"))  rects.push(`<ellipse cx="12" cy="-2" rx="6" ry="1.4" fill="none" stroke="#ffcb3d" stroke-width="1"/>`);
    if (o.accessories.includes("aura"))  rects.unshift(`<circle cx="12" cy="13" r="14" fill="#ffcb3d" opacity="0.18"/>`);
    if (o.accessories.includes("companion")) box(20, 12, 4, 4, "#6cdcff");
    return `<svg viewBox="-4 -5 32 34" shape-rendering="crispEdges" width="100%" height="100%">${rects.join("")}</svg>`;
  }

  // ---------- isometric world ----------
  const grid  = document.getElementById("iso-grid");
  const nodes = document.getElementById("iso-nodes");

  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const t = document.createElement("div");
      t.className = "tile";
      t.style.left = (x * TILE) + "px";
      t.style.top  = (y * TILE) + "px";
      if (PATH_TILES.has(`${x},${y}`)) {
        t.classList.add("path");
      } else if (((x * 7 + y * 3) % 11) === 0) {
        t.classList.add("has-tree");
      }
      grid.appendChild(t);
    }
  }

  QUESTS.forEach((q, i) => {
    const n = document.createElement("button");
    n.className = "node" + (q.boss ? " boss" : "");
    n.style.left = (q.map.x * TILE) + "px";
    n.style.top  = (q.map.y * TILE) + "px";
    n.title = `Lv ${q.lv} — ${q.title}`;
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
        <div class="tagline">${q.tagline}</div>
        <div class="save">&#9201; ${q.timeSaved}</div>
        <div class="tools">${q.tools.map(t => `<span class="tool">${t}</span>`).join("")}</div>
      </div>`;
    li.addEventListener("click", () => selectQuest(i));
    list.appendChild(li);
  });

  // ---------- talk outline ----------
  const talk = document.getElementById("talk-list");
  QUESTS.forEach((q, i) => {
    const li = document.createElement("li");
    li.className = "talk-card" + (q.boss ? " boss" : "");
    li.dataset.idx = String(i);
    li.innerHTML = `
      <span class="stop">STOP ${i + 1}/12</span>
      <span class="lv-pill">Lv ${q.lv}</span>
      <h4>${q.title}</h4>
      <div class="tagline">${q.tagline}</div>
      <div class="save">&#9201; ${q.timeSaved}</div>
      <ul>${(q.talkingPoints || []).map(p => `<li>${p}</li>`).join("")}</ul>
      <div class="tools">${q.tools.map(t => `<span class="tool">${t}</span>`).join("")}</div>`;
    li.addEventListener("click", () => selectQuest(i));
    talk.appendChild(li);
  });

  // ---------- ranks codex ----------
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
  const state = { level: 1, selected: 0 };

  function rankFor(level) {
    return RANKS.find(r => level >= r.from && level <= r.to) || RANKS[RANKS.length - 1];
  }

  // ---------- UI updates ----------
  function setLevel(lv) {
    lv = Math.max(1, Math.min(999, lv | 0));
    state.level = lv;

    const o = outfitFor(lv);
    buildMCChar(o);
    document.getElementById("iso-hero").innerHTML = buildIsoHeroSVG(o);

    document.getElementById("level-num").textContent = lv;
    document.getElementById("rank-name").textContent = rankFor(lv).name;

    // bars: show percent of progress through current rank tier
    const r = rankFor(lv);
    const span = (r.to - r.from + 1);
    const pct  = Math.min(100, Math.round(100 * ((lv - r.from + 1) / span)));
    document.getElementById("exp-fill").style.width = pct + "%";
    document.getElementById("exp-text").textContent = `${pct}% to next rank`;

    const energy = 80 + lv * 0.2 | 0;
    const focus  = 60 + lv * 0.15 | 0;
    document.getElementById("hp-fill").style.width = "100%";
    document.getElementById("mp-fill").style.width = "100%";
    document.getElementById("hp-text").textContent = `${energy} / ${energy} ENERGY`;
    document.getElementById("mp-text").textContent = `${focus} / ${focus} FOCUS`;

    document.getElementById("lv-input").value  = lv;
    document.getElementById("lv-number").value = lv;

    // inventory list
    const invEl = document.getElementById("inventory");
    invEl.innerHTML = o.inventory.map(s => `<li>${s}</li>`).join("");

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
    document.querySelectorAll(".rank").forEach(li => {
      const rr = RANKS[+li.dataset.idx];
      li.classList.toggle("current", lv >= rr.from && lv <= rr.to);
      li.classList.toggle("passed",  lv >  rr.to);
    });

    // park hero on the furthest reached quest tile
    let target = QUESTS[0];
    for (const q of QUESTS) if (lv >= q.lv) target = q;
    moveHeroTo(target.map.x, target.map.y);
  }

  function moveHeroTo(x, y) {
    const h = document.getElementById("iso-hero");
    h.style.left = (x * TILE) + "px";
    h.style.top  = (y * TILE) + "px";
  }

  // ---------- dialog ----------
  function say(speaker, html) {
    document.querySelector(".speaker").textContent = "▼ " + speaker;
    document.getElementById("dialog-text").innerHTML = html;
  }

  // ---------- selection ----------
  function selectQuest(i) {
    state.selected = i;
    const q = QUESTS[i];

    document.querySelectorAll(".quest").forEach(li => li.classList.toggle("active", +li.dataset.idx === i));
    document.querySelectorAll(".node").forEach(n  => n.classList.toggle("active", +n.dataset.idx === i));
    document.querySelectorAll(".talk-card").forEach(c => c.classList.toggle("active", +c.dataset.idx === i));

    const status = state.level >= q.lv ? "AVAILABLE" : `LOCKED · need Lv ${q.lv}`;
    const speaker = q.boss ? "FINAL STOP" : "AI MENTOR";
    const tools = (q.tools || []).map(t => `<span class="d-tag">${t}</span>`).join(" ");
    const points = (q.talkingPoints || []).map(p => `&#9656; ${p}`).join("\n");
    const html =
      `<span class="d-h">[Lv ${q.lv}] ${q.title}</span>  —  <em>${status}</em>\n` +
      `<span class="d-h">${q.tagline}</span>\n` +
      `${q.summary}\n\n` +
      `<span class="d-h">What changes for you:</span> ${q.whatChanges}\n` +
      `<span class="d-h">Time saved:</span> ${q.timeSaved}\n\n` +
      `<span class="d-h">Try these tools:</span> ${tools}\n\n` +
      `<span class="d-h">Talking points (${q.talkingPoints?.length || 0}):</span>\n${points}`;
    say(speaker, html);

    if (state.level >= q.lv) moveHeroTo(q.map.x, q.map.y);

    const li = document.querySelector(`.quest[data-idx="${i}"]`);
    if (li) li.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // ---------- inputs ----------
  document.getElementById("lv-input").addEventListener("input",  e => setLevel(+e.target.value));
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
