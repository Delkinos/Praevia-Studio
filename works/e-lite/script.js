gsap.registerPlugin(ScrollTrigger)

// HERO intro
gsap.from('.hero-title', { y: 100, opacity: 0, duration: 1 })
gsap.from('.hero-sub', { y: 50, opacity: 0, delay: 0.3 })

// REVEALS
gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.from(el, {
    scrollTrigger: el,
    y: 60,
    opacity: 0,
    duration: 0.8,
  })
})

// PROGRESS BAR
window.addEventListener('scroll', () => {
  let scrolled =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  document.querySelector('.progress').style.width = scrolled + '%'
})

// MAGNET EFFECT
document.querySelectorAll('.magnet').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    btn.style.transform = `translate(${(e.offsetX - 50) / 10}px, ${(e.offsetY - 20) / 10}px)`
  })
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)'
  })
})

//SPILL TEXT
const split = new SplitType('.hero-title', { type: 'chars' })
gsap.from(split.chars, {
  y: 120,
  opacity: 0,
  stagger: 0.4,
  duration: 1,
  ease: 'power4.out',
})

let
