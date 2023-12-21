import { BROWSER } from 'esm-env'
import pannable from './pannable.js'

if (BROWSER) {
  if (!document.querySelector('#draggable-styles')) {
    const style = document.createElement('style')
    style.setAttribute('id', 'draggable-styles')
    style.innerHTML = `
      [data-draggable-item].ghost {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        transition: none;
        z-index: 9999;
        box-shadow: var(--shadow-4);
      }
      :where([data-draggable-item].dragged) {
        opacity: 0;
        transition: none !important;
        animation: none !important;
        pointer-events: none;
      }`
    document.getElementsByTagName('head')[0].appendChild(style)
  }
}

type ReturnTypeDrop = { ghostDuration: number, ghostTarget: HTMLElement } | void
type Coord = { x: number, y: number }
type MoveCoords = Coord & { dx: number, dy: number }
type DraggableOption<T = null> = {
  onStart?: (e: MouseEvent | TouchEvent, coords: Coord) => void | false
  onMove?: (e: MouseEvent | TouchEvent, coords: MoveCoords) => void
  onEnd?: (e: MouseEvent | TouchEvent, coords: Coord) => ReturnTypeDrop | Promise<ReturnTypeDrop>
  handlerSelector?: string
}

export default function <T>(node: HTMLElement, { onStart, onMove, onEnd, handlerSelector }: DraggableOption<T>) {
  let ghostElement: ReturnType<typeof createGhost> | null = null
  node.setAttribute('data-draggable-item', '')
  return pannable(node, {
    onStart(e, coords) {
      const evTarget = e.target as HTMLElement
      const handler = handlerSelector ? evTarget.closest(handlerSelector) : evTarget.closest('[data-draggable-item]')
      if (!handler) return false
      e.preventDefault()
      e.stopPropagation()
      if (onStart) return onStart(e, coords)
    },
    onMove(e, coords) {
      if (ghostElement) {
        ghostElement.update(coords.dx, coords.dy)
        onMove && onMove(e, coords)
      } else {
        ghostElement = createGhost(node)
      }
    },
    async onEnd(e, coords) {
      let ghostTarget = node
      let duration = 250
      if (onEnd) {
        const returnedGhostSettings = await onEnd(e, coords)
        if (returnedGhostSettings) {
          ghostTarget = returnedGhostSettings.ghostTarget
          duration = returnedGhostSettings.ghostDuration
        }
      }
      ghostElement && ghostElement.dispose(duration, ghostTarget)
      ghostElement = null
    }
  })
}

function createGhost(node: HTMLElement) {
  const { width, height, left, top } = node.getBoundingClientRect()
  const clone = node.cloneNode(true) as HTMLElement
  clone.classList.add('ghost')
  clone.style.width = `${width}px`
  clone.style.height = `${height}px`
  let gx = left
  let gy = top
  clone.style.transform = `translate3d(${gx}px, ${gy}px, 0)`
  document.body.append(clone)
  node.classList.add('dragged')
  return {
    update(dx: number, dy: number) {
      gx += dx
      gy += dy
      clone.style.transform = `translate3d(${gx}px, ${gy}px, 0)`
    },
    dispose(duration: number, target: HTMLElement) {
      const { left, top } = target.getBoundingClientRect()
      clone.style.transition = `transform ${duration}ms ease`
      clone.style.transform = `translate3d(${left}px, ${top}px, 0)`
      setTimeout(() => {
        clone.remove()
        node.classList.remove('dragged')
      }, duration)
    }
  }
}