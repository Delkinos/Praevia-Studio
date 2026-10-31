// ---------- Newsletter form (sends to Brevo) ----------
// In script.js, find the block under the comment
//     Newsletter form (front-end only)
// and delete everything down to (but not including) the comment
//     Back to top
// Then paste this code in its place.
// The old block stopped the form from sending, so no emails were ever saved.

const form = document.getElementById('newsletterForm')
const msg = document.getElementById('newsletterMsg')
const emailInput = document.getElementById('newsletterEmail')
const frame = document.getElementById('subscribeFrame')
let waiting = false

if (form && msg && emailInput) {
  form.addEventListener('submit', (e) => {
    const value = emailInput.value.trim()
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    if (!isValid) {
      e.preventDefault()
      msg.textContent = 'That email doesn\u2019t look right — please double-check it.'
      msg.style.color = '#B3261E'
      return
    }

    // Valid: let the form send to Brevo, then wait for the reply
    waiting = true
    msg.textContent = 'Sending...'
    msg.style.color = '#4A4940'
  })

  if (frame) {
    frame.addEventListener('load', () => {
      if (!waiting) return
      waiting = false
      msg.textContent =
        'Almost done — check your inbox to confirm your subscription (and your spam folder).'
      msg.style.color = '#1E3AF0'
      form.reset()
    })
  }
}
