(function () {
  const strip = document.getElementById('canopyStrip');
  if (!strip) return;

  // Illustrative decade snapshots: [year, % of cells "cleared"]
  const decades = [
    { year: 1990, cleared: 0.03 },
    { year: 1998, cleared: 0.10 },
    { year: 2006, cleared: 0.17 },
    { year: 2014, cleared: 0.24 },
    { year: 2024, cleared: 0.32 },
  ];

  const CELLS_PER_ROW = 44;
  const rows = [];

  decades.forEach((d) => {
    const row = document.createElement('div');
    row.className = 'canopy-row';
    row.setAttribute('data-year', d.year);

    const clearedCount = Math.round(CELLS_PER_ROW * d.cleared);
    // Spread cleared cells evenly rather than random, so the pattern reads
    // as gradual thinning rather than noise.
    const clearedIndexes = new Set();
    if (clearedCount > 0) {
      const step = CELLS_PER_ROW / clearedCount;
      for (let i = 0; i < clearedCount; i++) {
        clearedIndexes.add(Math.floor(i * step));
      }
    }

    for (let i = 0; i < CELLS_PER_ROW; i++) {
      const cell = document.createElement('span');
      cell.className = 'canopy-cell';
      if (clearedIndexes.has(i)) {
        cell.dataset.willClear = 'true';
      }
      row.appendChild(cell);
    }

    strip.appendChild(row);
    rows.push(row);
  });

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function revealDecline() {
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('[data-will-clear="true"]');
      cells.forEach((cell, i) => {
        const delay = prefersReducedMotion ? 0 : rowIndex * 120 + i * 12;
        setTimeout(() => cell.classList.add('cleared'), delay);
      });
    });
  }

  if (prefersReducedMotion) {
    revealDecline();
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealDecline();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(strip);
  } else {
    revealDecline();
  }
})();
