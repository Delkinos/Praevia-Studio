document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle')
  const primaryNav = document.getElementById('primary-nav')

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open')
      navToggle.setAttribute('aria-expanded', String(isOpen))
    })

    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('is-open')
        navToggle.setAttribute('aria-expanded', 'false')
      })
    })
  }

  /* ---------- Index rail: click to scroll ---------- */
  const railItems = document.querySelectorAll('.index-rail__item')
  railItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.target)
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })

  /* ---------- Scrollspy: highlight active section in rail + nav ---------- */
  const sections = ['#hero', '#works', '#journal', '#about', '#contact']
    .map((id) => document.querySelector(id))
    .filter(Boolean)

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`
            railItems.forEach((btn) => {
              btn.classList.toggle('is-active', btn.dataset.target === id)
            })
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    sections.forEach((section) => spy.observe(section))
  }

  /* ---------- Works filter ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn')
  const workCards = document.querySelectorAll('.work-card:not(.ad-slot)')

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'))
      btn.classList.add('is-active')

      const filter = btn.dataset.filter
      workCards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter
        card.classList.toggle('is-hidden', !show)
      })
    })
  })

  /* ---------- Newsletter form (front-end only) ---------- */
  const form = document.getElementById('newsletterForm')
  const msg = document.getElementById('newsletterMsg')
  const emailInput = document.getElementById('newsletterEmail')

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const value = emailInput.value.trim()
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

      if (!isValid) {
        msg.textContent =
          'That email doesn\u2019t look right — please double-check it.'
        msg.style.color = '#B3261E'
        return
      }
      msg.textContent = `Thanks — confirmation on its way to ${value}.`
      msg.style.color = '#1E3AF0'
    })
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop')
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  /* ---------- Smooth scroll for in-page nav links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')
      if (targetId.length > 1) {
        const target = document.querySelector(targetId)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    })
  })
})
