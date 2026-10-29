// futuristic hover glow
const panels = document.querySelectorAll('.panel')

panels.forEach((panel) => {
  panel.addEventListener('mousemove', (e) => {
    const rect = panel.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    panel.style.background = `
      radial-gradient(circle at ${x}px ${y}px,
      rgba(0,217,255,.14),
      transparent 35%),
      linear-gradient(180deg,#0e141d,#0a0f16)
      `
  })

  panel.addEventListener('mouseleave', () => {
    panel.style.background = `linear-gradient(180deg,#0e141d,#0a0f16)`
  })
})
