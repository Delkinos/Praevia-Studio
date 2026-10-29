// Shows your latest Blogger posts inside <div class="journal-list" id="blog-posts"></div>
// Uses the same classes as your Journal section, so it matches your design.
;(function () {
  // ====== CHANGE THESE ======
  var BLOG_URL = 'https://blog.praeviastudio.com'
  var MAX_POSTS = 6
  var EXCERPT_LENGTH = 160
  // ==========================

  var container = document.getElementById('blog-posts')
  if (!container) return

  var base = BLOG_URL.replace(/\/$/, '')
  var feedUrl = base + '/feeds/posts/default?max-results=' + MAX_POSTS

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function getLink(entry) {
    var links = entry.link || []
    for (var i = 0; i < links.length; i++) {
      if (links[i].rel === 'alternate') return links[i].href
    }
    return base
  }

  function el(tag, className, text) {
    var node = document.createElement(tag)
    if (className) node.className = className
    if (text) node.textContent = text
    return node
  }

  function render(entries) {
    container.textContent = ''
    entries.forEach(function (entry) {
      var link = getLink(entry)
      var html = entry.content
        ? entry.content.$t
        : entry.summary
          ? entry.summary.$t
          : ''
      var doc = new DOMParser().parseFromString(html, 'text/html')
      var text = (doc.body.textContent || '').replace(/\s+/g, ' ').trim()
      if (text.length > EXCERPT_LENGTH)
        text = text.slice(0, EXCERPT_LENGTH).trim() + '...'
      var tag =
        entry.category && entry.category.length
          ? entry.category[0].term
          : 'Journal'

      var row = el('article', 'journal-row')
      row.appendChild(
        el('span', 'journal-row__date', formatDate(entry.published.$t)),
      )

      var middle = document.createElement('div')
      var h3 = el('h3', 'journal-row__title')
      var a = document.createElement('a')
      a.href = link
      a.textContent = entry.title.$t
      h3.appendChild(a)
      middle.appendChild(h3)
      if (text) middle.appendChild(el('p', 'journal-row__excerpt', text))
      row.appendChild(middle)

      row.appendChild(el('span', 'journal-row__tag', tag))
      container.appendChild(row)
    })
  }

  // Backup method: load the feed as a script, in case the normal request is blocked
  function loadWithScriptTag() {
    var cb = 'bloggerFeedCallback'
    window[cb] = function (data) {
      render((data.feed && data.feed.entry) || [])
    }
    var s = document.createElement('script')
    s.src = feedUrl + '&alt=json-in-script&callback=' + cb
    s.onerror = function () {
      container.textContent = ''
    }
    document.body.appendChild(s)
  }

  fetch(feedUrl + '&alt=json')
    .then(function (res) {
      if (!res.ok) throw new Error('Feed error')
      return res.json()
    })
    .then(function (data) {
      render((data.feed && data.feed.entry) || [])
    })
    .catch(loadWithScriptTag)
})()
