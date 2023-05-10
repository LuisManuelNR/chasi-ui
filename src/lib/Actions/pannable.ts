type Coord = {
  x: number
  y: number
}

export type PannableParams = {
  onStart?: (event: MouseEvent | TouchEvent, coords: Coord) => void
  onMove?: (event: MouseEvent | TouchEvent, coords: Coord & { dx: number, dy: number }) => void
  onEnd?: (event: MouseEvent | TouchEvent, coords: Coord) => void
}

export default function (node: HTMLElement, params?: PannableParams): { destroy?: () => void } {
  let x: number
  let y: number

  function handleMousedown(event: MouseEvent | TouchEvent) {
    // event.preventDefault()
    event.stopPropagation()
    const e = event instanceof MouseEvent ? event : event.touches[0]
    x = e.clientX
    y = e.clientY

    if (params && params.onStart) {
      params.onStart(event, { x, y })
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
      params.onMove(event, { x, y, dx, dy })
    }
  }

  function handleMouseup(event: MouseEvent | TouchEvent) {
    const e = event instanceof MouseEvent ? event : event.changedTouches[0]
    x = e.clientX
    y = e.clientY

    if (params && params.onEnd) {
      params.onEnd(event, { x, y })
    }

    window.removeEventListener('mousemove', handleMousemove)
    window.removeEventListener('mouseup', handleMouseup)
    window.removeEventListener('touchmove', handleMousemove)
    window.removeEventListener('touchend', handleMouseup)
  }

  node.addEventListener('mousedown', handleMousedown)
  node.addEventListener('touchstart', handleMousedown)

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMousedown)
      node.removeEventListener('touchstart', handleMousedown)
    }
  }
}