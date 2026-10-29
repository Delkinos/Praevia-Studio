(function () {
  const slider = document.getElementById('roastSlider');
  const bean = document.getElementById('beanVisual');
  const stageEl = document.getElementById('roastStage');
  const crackEl = document.getElementById('roastCrack');
  const notesEl = document.getElementById('roastNotes');

  if (!slider || !bean) return;

  const roastLevels = {
    1: {
      stage: 'Light',
      color: '#D9AD70',
      crack: 'Pulled right at first crack — high acidity, no oils on the surface.',
      notes: 'Green apple, jasmine, lemon zest',
    },
    2: {
      stage: 'City',
      color: '#C99A65',
      crack: 'A minute past first crack — acidity settles, sweetness starts to show.',
      notes: 'Honey, peach, black tea',
    },
    3: {
      stage: 'Full City',
      color: '#A8642E',
      crack: 'Roasted between first and second crack — balanced, still holds acidity.',
      notes: 'Toasted almond, brown sugar, dried cherry',
    },
    4: {
      stage: 'Dark',
      color: '#6E4321',
      crack: 'Just into second crack — oils reach the surface, sweetness turns smoky.',
      notes: 'Dark chocolate, molasses, toasted walnut',
    },
    5: {
      stage: 'French',
      color: '#3E2717',
      crack: 'Deep into second crack — origin flavor gives way to pure roast character.',
      notes: 'Char, black pepper, bittersweet cocoa',
    },
  };

  function applyLevel(level) {
    const data = roastLevels[level];
    if (!data) return;
    bean.style.backgroundColor = data.color;
    stageEl.textContent = data.stage;
    crackEl.textContent = data.crack;
    notesEl.textContent = data.notes;
  }

  slider.addEventListener('input', (e) => applyLevel(e.target.value));
  applyLevel(slider.value);
})();
