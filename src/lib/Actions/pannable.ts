import { throttle } from '$lib/CGraph/utils.js'
import type { Action } from 'svelte/action'

type Coord = {
  x: number
  y: number
}

export type PannableParams = {
  onStart?: (event: MouseEvent | TouchEvent, coords: Coord) => void
  onMove?: (event: MouseEvent | TouchEvent, coords: Coord & { dx: number, dy: number }) => void
  onEnd?: (event: MouseEvent | TouchEvent, coords: Coord) => void
}

const pannable: Action<HTMLElement, PannableParams> = (node: HTMLElement, params?: PannableParams) => {
  let x: number
  let y: number

  const trotMove = throttle((event: MouseEvent | TouchEvent) => {
    if (!params || !params.onMove) return
    const e = event instanceof MouseEvent ? event : event.touches[0]
    const dx = e.clientX - x
    const dy = e.clientY - y
    x = e.clientX
    y = e.clientY
    params.onMove(event, { x, y, dx, dy })
  }, 10)

  function handleMousedown(event: MouseEvent | TouchEvent) {
    event.stopPropagation()
    const e = event instanceof MouseEvent ? event : event.touches[0]
    x = e.clientX
    y = e.clientY

    if (params && params.onStart) {
      params.onStart(event, { x, y })
    }

    window.addEventListener('mousemove', trotMove)
    window.addEventListener('mouseup', handleMouseup)
    window.addEventListener('touchmove', trotMove)
    window.addEventListener('touchend', handleMouseup)
  }

  function handleMouseup(event: MouseEvent | TouchEvent) {
    const e = event instanceof MouseEvent ? event : event.changedTouches[0]
    x = e.clientX
    y = e.clientY

    if (params && params.onEnd) {
      params.onEnd(event, { x, y })
    }

    window.removeEventListener('mousemove', trotMove)
    window.removeEventListener('mouseup', handleMouseup)
    window.removeEventListener('touchmove', trotMove)
    window.removeEventListener('touchend', handleMouseup)
  }

  node.addEventListener('mousedown', handleMousedown)
  node.addEventListener('touchstart', handleMousedown)

  return {
    destroy: () => {
      node.removeEventListener('mousedown', handleMousedown)
      node.removeEventListener('touchstart', handleMousedown)
    }
  }
}

export default pannable