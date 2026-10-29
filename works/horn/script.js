(function(){
  "use strict";

  // ---------- DATA ----------
  const SPECIES = [
    {
      id:"bighorn", common:"Bighorn Sheep", sci:"Ovis canadensis", category:"curved",
      region:"North America", length:"~104 cm", weight:"up to 14 kg",
      desc:"Males clash head-on at speeds near 30 km/h; a doubled skull and horn base absorb the impact. Ridges on the horn mark each year of growth, like tree rings.",
      path:"M100 40 Q70 60 72 100 Q74 140 100 165 Q120 185 108 205"
    },
    {
      id:"gemsbok", common:"Gemsbok (Oryx)", sci:"Oryx gazella", category:"straight",
      region:"Southern Africa", length:"~85 cm", weight:"~1.2 kg",
      desc:"Long, near-straight rapier horns ringed with sharp ridges near the base. Used in fencing duels — and, historically, mistaken for the source of the unicorn myth when seen in profile.",
      path:"M95 205 L102 150 L110 95 L118 40 M95 205 L102 150"
    },
    {
      id:"kudu", common:"Greater Kudu", sci:"Tragelaphus strepsiceros", category:"spiral",
      region:"Eastern & Southern Africa", length:"~120 cm", weight:"~5 kg",
      desc:"The most dramatic spiral in the animal kingdom — up to two and a half full turns. Herders in parts of Africa still fashion the horn into a wind instrument, the mbombe.",
      path:"M110 210 C60 190 150 170 100 150 C50 130 140 110 100 90 C65 74 130 60 105 35"
    },
    {
      id:"rhino", common:"Black Rhinoceros", sci:"Diceros bicornis", category:"straight",
      region:"Eastern & Southern Africa", length:"~50 cm", weight:"~1.5 kg",
      desc:"Not a true horn at all — no bony core, just densely compressed keratin fibers built up from the skin. Grows continuously and can regrow if broken.",
      path:"M75 205 Q90 140 108 100 Q118 76 140 55 M108 100 Q118 130 112 160"
    },
    {
      id:"ibex", common:"Alpine Ibex", sci:"Capra ibex", category:"curved",
      region:"European Alps", length:"~98 cm", weight:"~4.5 kg",
      desc:"Sweeps backward in a long scythe-like curve, knobbed with growth ridges. Males rear up and slam horns downward, sometimes from a standing drop of over a meter.",
      path:"M110 205 Q80 190 78 150 Q76 110 95 80 Q112 55 100 35"
    },
    {
      id:"addax", common:"Addax", sci:"Addax nasomaculatus", category:"spiral",
      region:"Sahara Desert", length:"~80 cm", weight:"~1 kg",
      desc:"Two loose open twists rather than a tight coil. One of the most endangered large mammals on Earth, adapted to go without standing water for most of its life.",
      path:"M105 205 C70 185 140 165 95 140 C60 118 135 100 100 60 Q95 45 108 35"
    },
    {
      id:"markhor", common:"Markhor", sci:"Capra falconeri", category:"spiral",
      region:"Central & South Asia", length:"~160 cm", weight:"~6 kg",
      desc:"The longest corkscrew of any wild goat — a true double-helix twist. Its name means 'snake-eater' in Persian, from old folklore rather than diet.",
      path:"M100 210 C70 190 130 175 95 155 C65 138 135 122 95 100 C65 84 135 68 100 45 Q90 38 100 30"
    },
    {
      id:"buffalo", common:"Water Buffalo", sci:"Bubalus arnee", category:"curved",
      region:"South & Southeast Asia", length:"~200 cm span", weight:"~10 kg",
      desc:"The widest horn span of any living bovid, curving out and back in a broad crescent. Wild individuals carry far heavier, more dramatic horns than domesticated stock.",
      path:"M50 90 Q75 60 105 70 Q135 60 160 90 M105 70 L105 55"
    },
    {
      id:"pronghorn", common:"Pronghorn", sci:"Antilocapra americana", category:"straight",
      region:"North America", length:"~43 cm", weight:"~0.4 kg",
      desc:"Unique among horn-bearers: it sheds and regrows its keratin sheath yearly, like an antler, while keeping a permanent bony core beneath. Also the second-fastest land animal alive.",
      path:"M100 205 L102 120 L98 60 M98 60 Q80 55 75 40 M102 120 Q118 118 122 105"
    }
  ];

  const CATEGORY_LABEL = { spiral:"Spiral", curved:"Curved", straight:"Straight" };

  // ---------- BUILD SPECIMEN GRID ----------
  const grid = document.getElementById("specimenGrid");
  SPECIES.forEach((s, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.category = s.category;
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");

    const figNum = "Fig. " + String(i + 1).padStart(2, "0");

    card.innerHTML = `
      <div class="plate">
        <span class="fig mono">${figNum}</span>
        <span class="cat">${CATEGORY_LABEL[s.category]}</span>
        <svg viewBox="0 0 200 240" aria-hidden="true">
          <path class="horn-path" d="${s.path}"/>
        </svg>
      </div>
      <div class="card-body">
        <span class="common display">${s.common}</span>
        <span class="sci">${s.sci}</span>
        <div class="stats-row">
          <div class="stat">Region<b>${s.region}</b></div>
          <div class="stat">Horn length<b>${s.length}</b></div>
          <div class="stat">Horn mass<b>${s.weight}</b></div>
        </div>
        <p class="desc">${s.desc}</p>
        <span class="expand-hint">Tap for field notes ▾</span>
      </div>
    `;

    card.addEventListener("click", () => toggleCard(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCard(card); }
    });

    grid.appendChild(card);
  });

  function toggleCard(card){
    const isOpen = card.classList.toggle("expanded");
    card.setAttribute("aria-expanded", String(isOpen));
    const hint = card.querySelector(".expand-hint");
    hint.textContent = isOpen ? "Collapse ▴" : "Tap for field notes ▾";
  }

  // ---------- SCROLL REVEAL ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll(".card").forEach(c => io.observe(c));

  // ---------- FILTER BAR ----------
  const filterBar = document.getElementById("filterBar");
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".card").forEach(card => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden-by-filter", !match);
    });
  });

  // ---------- TABS ----------
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected","false"); });
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      btn.setAttribute("aria-selected","true");
      document.querySelector(`.tab-panel[data-panel="${btn.dataset.tab}"]`).classList.add("active");
    });
  });

  // ---------- MEASURE / COMPARE ----------
  // approximate horn lengths in cm for visual comparison (illustrative, not exact records)
  const LENGTH_CM = {
    bighorn: 104, gemsbok: 85, kudu: 120, rhino: 50, ibex: 98,
    addax: 80, markhor: 160, buffalo: 200, pronghorn: 43
  };
  const maxLen = Math.max(...Object.values(LENGTH_CM));

  const select = document.getElementById("measureSelect");
  SPECIES.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.common;
    select.appendChild(opt);
  });

  const barsWrap = document.getElementById("measureBars");

  function renderBars(highlightId){
    barsWrap.innerHTML = "";
    SPECIES.slice().sort((a,b) => LENGTH_CM[b.id]-LENGTH_CM[a.id]).forEach(s => {
      const pct = Math.round((LENGTH_CM[s.id] / maxLen) * 100);
      const row = document.createElement("div");
      row.className = "measure-row";
      row.innerHTML = `
        <label>${s.common}</label>
        <div class="bar-track"><div class="bar-fill" style="width:0%"></div></div>
        <span class="val mono">${LENGTH_CM[s.id]} cm</span>
      `;
      const fill = row.querySelector(".bar-fill");
      if (s.id === highlightId){
        fill.style.background = "linear-gradient(90deg, var(--amber), #fff5d6)";
      }
      barsWrap.appendChild(row);
      requestAnimationFrame(() => { fill.style.width = pct + "%"; });
    });
  }

  select.addEventListener("change", () => renderBars(select.value));
  select.value = "kudu";
  renderBars("kudu");

  // ---------- MOBILE NAV ----------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }));

})();
