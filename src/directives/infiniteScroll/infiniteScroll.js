export default {
  bind(el, binding) {
    let target = el
    if (el.getAttribute('data-scrollTarget')) {
      target = el.querySelector(el.getAttribute('data-scrollTarget'))
    }
    target.addEventListener('scroll', e => {
      const busy = el.getAttribute('data-infiniteScrollDisabled') ? true : false
      const distance = el.getAttribute('data-infiniteScrollDistance')
        ? Number.parseInt(el.getAttribute('data-infiniteScrollDistance'), 10)
        : 100

      if (!busy && (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < distance)) {
        el.setAttribute('data-infiniteScrollDisabled', true)
        binding.value(e)
      }
    })
  },
  unbind(el) {
    el.removeEventListener('scroll')
  }
}
