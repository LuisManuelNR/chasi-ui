type ZoomableParams = {
  onZoom?: (delta: number, center: { x: number, y: number }, isTouch: boolean) => void
}

export default function (node: HTMLElement, params: ZoomableParams): { destroy?: () => void } {
  let dist: number

  function scroll(e: WheelEvent) {
    e.preventDefault()

    if (params.onZoom) {
      params.onZoom(e.deltaY, { x: e.clientX, y: e.clientY }, false)
    }
  }

  function touchStart(e: TouchEvent) {
    if (e.touches.length >= 2) {
      dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY)
      window.addEventListener('touchmove', handleTouchmove)
      window.addEventListener('touchend', handleTouchend)
    }
  }

  function handleTouchmove(e: TouchEvent) {
    e.preventDefault()
    const currentDist = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY)
    const delta = dist - currentDist
    dist = currentDist
    if (params.onZoom) {
      const centerX = (e.touches[0].pageX + e.touches[1].pageX) / 2
      const centerY = (e.touches[0].pageY + e.touches[1].pageY) / 2
      params.onZoom(delta, { x: centerX, y: centerY }, true)
    }
  }
  function handleTouchend() {
    window.removeEventListener('touchmove', handleTouchmove)
    window.removeEventListener('touchend', handleTouchend)
  }

  node.addEventListener('wheel', scroll)
  node.addEventListener('touchstart', touchStart)

  return {
    destroy() {
      node.removeEventListener('wheel', scroll)
      node.removeEventListener('touchstart', touchStart)
    }
  }
}
