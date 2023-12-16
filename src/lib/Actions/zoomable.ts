import { throttle } from '../utils.js'

type ZoomableParams = {
  onZoom?: (delta: number, center: { x: number, y: number }, isTouch: boolean) => void
}

export default (node: HTMLElement, params: ZoomableParams) => {
  let dist: number

  const trotZoom = throttle((e: Event) => {
    if (!params || !params.onZoom) return
    if (e instanceof WheelEvent) {
      params.onZoom(e.deltaY > 0 ? 1 : -1, { x: e.clientX, y: e.clientY }, false)
    }
    if (e instanceof TouchEvent) {
      const currentDist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY)
      const delta = dist - currentDist > 0 ? 1 : -1
      dist = currentDist
      const centerX = (e.touches[0].pageX + e.touches[1].pageX) / 2
      const centerY = (e.touches[0].pageY + e.touches[1].pageY) / 2
      params.onZoom(delta, { x: centerX, y: centerY }, true)
    }
  }, 10)

  function handleWheel(e: WheelEvent) {
    e.preventDefault()
    trotZoom(e)
  }

  function handleTouchStart(e: TouchEvent) {
    e.preventDefault()
    if (e.touches.length >= 2) {
      dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY)
      window.addEventListener('touchmove', trotZoom)
      window.addEventListener('touchend', handleTouchend)
    }
  }

  function handleTouchend() {
    window.removeEventListener('touchmove', trotZoom)
    window.removeEventListener('touchend', handleTouchend)
  }

  node.addEventListener('wheel', handleWheel, { passive: false })
  node.addEventListener('touchstart', handleTouchStart, { passive: false })

  return {
    destroy() {
      node.removeEventListener('wheel', handleWheel)
      node.removeEventListener('touchstart', handleTouchStart)
    }
  }
}
