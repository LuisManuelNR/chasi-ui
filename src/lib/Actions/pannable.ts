type Coord = {
  x: number
  y: number
}

export type PannableParams = {
  onStart?: (coords: Coord, ev: MouseEvent | TouchEvent) => void
  onMove?: (coords: Coord & { dx: number, dy: number }, ev: MouseEvent | TouchEvent) => void
  onEnd?: (coords: Coord, ev: MouseEvent | TouchEvent) => void
}

export default function (node: HTMLElement, params?: PannableParams): { destroy?: () => void } {
  let x: number
  let y: number

  function handleMousedown(event: MouseEvent | TouchEvent) {
    event.stopPropagation()
    const e = event instanceof MouseEvent ? event : event.touches[0]
    x = e.clientX
    y = e.clientY

    if (params && params.onStart) {
      params.onStart({ x, y }, event)
    }

    window.addEventListener('mousemove', handleMousemove)
    window.addEventListener('mouseup', handleMouseup)
    window.addEventListener('touchmove', handleMousemove)
    window.addEventListener('touchend', handleMouseup)
  }

  function handleMousemove(event: MouseEvent | TouchEvent) {
    const e = event instanceof MouseEvent ? event : event.touches[0]
    const dx = e.clientX - x
    const dy = e.clientY - y
    x = e.clientX
    y = e.clientY

    if (params && params.onMove) {
      params.onMove({ x, y, dx, dy }, event)
    }
  }

  function handleMouseup(event: MouseEvent | TouchEvent) {
    const e = event instanceof MouseEvent ? event : event.changedTouches[0]
    x = e.clientX
    y = e.clientY

    if (params && params.onEnd) {
      params.onEnd({ x, y }, event)
    }

    window.removeEventListener('mousemove', handleMousemove)
    window.removeEventListener('mouseup', handleMouseup)
    window.removeEventListener('touchmove', handleMousemove)
    window.removeEventListener('touchend', handleMouseup)
  }

  node.addEventListener('mousedown', handleMousedown)
  node.addEventListener('touchstart', handleMousedown, { passive: true })

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMousedown)
      node.removeEventListener('touchstart', handleMousedown)
    }
  }
}