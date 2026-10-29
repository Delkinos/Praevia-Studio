(function () {
  const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
  let bagCount = 0;
  const bagCountEl = document.getElementById('bagCount');

  // Build size chips for every garment
  document.querySelectorAll('.garment').forEach((garment) => {
    const sizesEl = garment.querySelector('[data-sizes]');
    SIZES.forEach((size) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'size-chip';
      chip.textContent = size;
      chip.addEventListener('click', () => {
        sizesEl.querySelectorAll('.size-chip').forEach((c) => c.classList.remove('selected'));
        chip.classList.add('selected');
      });
      sizesEl.appendChild(chip);
    });

    const addBtn = garment.querySelector('[data-add]');
    addBtn.addEventListener('click', () => {
      const hasSize = sizesEl.querySelector('.size-chip.selected');
      if (!hasSize) {
        // nudge the sizes so the shopper picks one first
        sizesEl.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }],
          { duration: 220 }
        );
        return;
      }
      addBtn.textContent = 'Added';
      addBtn.classList.add('added');
      bagCount += 1;
      bagCountEl.textContent = bagCount;
      setTimeout(() => {
        addBtn.textContent = 'Add to bag';
        addBtn.classList.remove('added');
      }, 1400);
    });
  });

  // Drag-to-scroll rack
  const rail = document.getElementById('rackRail');
  if (rail) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const start = (x) => {
      isDown = true;
      rail.classList.add('dragging');
      startX = x - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
    };
    const move = (x) => {
      if (!isDown) return;
      const walk = x - rail.offsetLeft - startX;
      rail.scrollLeft = scrollLeft - walk;
    };
    const end = () => {
      isDown = false;
      rail.classList.remove('dragging');
    };

    rail.addEventListener('mousedown', (e) => start(e.pageX));
    rail.addEventListener('mousemove', (e) => move(e.pageX));
    window.addEventListener('mouseup', end);
    rail.addEventListener('mouseleave', end);

    rail.addEventListener('touchstart', (e) => start(e.touches[0].pageX), { passive: true });
    rail.addEventListener('touchmove', (e) => move(e.touches[0].pageX), { passive: true });
    rail.addEventListener('touchend', end);
  }

  // Newsletter form
  const form = document.getElementById('newsletterForm');
  const msg = document.getElementById('newsletterMsg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      if (email) {
        msg.textContent = "You're on the list — watch your inbox before the next drop.";
        form.reset();
      }
    });
  }
})();
