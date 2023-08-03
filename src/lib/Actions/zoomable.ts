import { throttle } from '$lib/CGraph/utils.js'

type ZoomableParams = {
  onZoom?: (delta: number, center: { x: number, y: number }, isTouch: boolean) => void
}

export default function (node: HTMLElement, params: ZoomableParams): { destroy?: () => void } {
  let dist: number

  const trotZoom = throttle((e: WheelEvent | TouchEvent) => {
    if (!params || !params.onZoom) return
    if (e instanceof WheelEvent) {
      e.preventDefault()
      params.onZoom(e.deltaY, { x: e.clientX, y: e.clientY }, false)
    } else {
      const currentDist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY)
      const delta = dist - currentDist
      dist = currentDist
      const centerX = (e.touches[0].pageX + e.touches[1].pageX) / 2
      const centerY = (e.touches[0].pageY + e.touches[1].pageY) / 2
      params.onZoom(delta, { x: centerX, y: centerY }, true)
    }
  }, 10)

  function touchStart(e: TouchEvent) {
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

  node.addEventListener('wheel', trotZoom)
  node.addEventListener('touchstart', touchStart)

  return {
    destroy() {
      node.removeEventListener('wheel', trotZoom)
      node.removeEventListener('touchstart', touchStart)
    }
  }
}
