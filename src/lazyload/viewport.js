// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport

function getViewportWidth() {
  return window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || document.body.clientWidth
}

function getViewportHeight() {
  return window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || document.body.clientHeight
}

/**
 * 完全在视口之内
 * rect.top 元素上线距离viewport上线的距离
 * rect.bottom 元素下线距离viewport上线的距离
 */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= getViewportHeight() &&
    rect.right <= getViewportWidth()
  )
}

/**
 * 元素任一部分在视口内
 */
export function isAnyPartOfElementInViewport(el, threshold=0) {
  const rect = el.getBoundingClientRect()

  const viewportHeight = getViewportHeight()
  const verticalInView = (rect.top - threshold <= viewportHeight) && (rect.bottom + threshold >= 0)

  return verticalInView
}
