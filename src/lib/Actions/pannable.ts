import { throttle } from '../utils.js'

type Coord = {
  x: number
  y: number
}

type MoveCoords = Coord & { dx: number, dy: number }

export type PannableParams = {
  onStart?: (e: MouseEvent | TouchEvent, coords: Coord) => void | false
  onMove?: (e: MouseEvent | TouchEvent, coords: MoveCoords) => void
  onEnd?: (e: MouseEvent | TouchEvent, coords: Coord) => void
}

export default function (node: HTMLElement, params?: PannableParams) {
  let x: number
  let y: number

  function handleMove(event: MouseEvent | TouchEvent) {
    if (!params || !params.onMove) return
    const e = event instanceof MouseEvent ? event : event.touches[0]
    const evX = Math.round(e.clientX)
    const evY = Math.round(e.clientY)
    const dx = evX - x
    const dy = evY - y
    x = evX
    y = evY
    params.onMove(event, { x, y, dx, dy })
  }

  function handleMousedown(event: MouseEvent | TouchEvent) {
    const e = event instanceof MouseEvent ? event : event.touches[0]
    x = Math.round(e.clientX)
    y = Math.round(e.clientY)
    const attachEvents = () => {
      window.addEventListener('mousemove', handleMove)
      window.addEventListener('mouseup', handleMouseup)
      window.addEventListener('touchmove', handleMove)
      window.addEventListener('touchend', handleMouseup)
    }

    if (params && params.onStart) {
      if (params.onStart(event, { x, y }) !== false) attachEvents()
    } else {
      attachEvents()
    }
  }

  function handleMouseup(event: MouseEvent | TouchEvent) {
    const e = event instanceof MouseEvent ? event : event.changedTouches[0]
    x = e.clientX
    y = e.clientY


    if (params && params.onEnd) {
      params.onEnd(event, { x, y })
    }

    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('mouseup', handleMouseup)
    window.removeEventListener('touchmove', handleMove)
    window.removeEventListener('touchend', handleMouseup)
  }

  node.addEventListener('mousedown', handleMousedown)
  node.addEventListener('touchstart', handleMousedown, { passive: false })

  return {
    destroy: () => {
      node.removeEventListener('mousedown', handleMousedown)
      node.removeEventListener('touchstart', handleMousedown)
    }
  }
}