import throttle from 'lodash.throttle'
import $ from 'jquery'

import { isAnyPartOfElementInViewport } from './viewport'

/**
 * throttle依赖了全局的Date.now
 */
Date.now = Date.now || function() {
  return +new Date()
}

const $window = $(window)
const $lazyload = $('[data-role="lazyload"]')
const scrollEvent = 'scroll.lazyload'

let loadedCounter = 0

const onScroll = function() {
  $lazyload.each(function(index, elem) {
    const $elem = $(elem)
    if($elem.hasClass('loaded') || !isAnyPartOfElementInViewport(elem, 300)) {
      return
    }

    $elem.addClass('loaded')
    $elem.find("img[data-src]").each(function() {
      let src = $(this).data("src")
      $(this).attr("src", src)
    })

    loadedCounter++
    if (loadedCounter === $lazyload.length) {
      $window.off(scrollEvent)
    }
  })
}
$window.on(scrollEvent, throttle(onScroll, 150)).trigger(scrollEvent)
