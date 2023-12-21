import { BROWSER } from 'esm-env'
import pannable from './pannable.js'

type ReturnTypeDrop = HTMLElement | void
type DraggableOption = {
  onDrop?: (source: HTMLElement, target: HTMLElement, coords: { x: number, y: number }) => ReturnTypeDrop | Promise<ReturnTypeDrop>
  onMove?: (source: HTMLElement, target: HTMLElement, coords: { x: number, y: number, dx: number, dy: number }) => void
  onStart?: (source: HTMLElement, target: HTMLElement, coords: { x: number, y: number }) => void
  handlerSelector?: string
  duration?: number
}

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

export default function (node: HTMLElement, { onDrop, onMove, onStart, handlerSelector, duration = 250 }: DraggableOption) {
  let ghostElement: ReturnType<typeof createGhost> | null = null
  const handler = handlerSelector ? node.querySelector(handlerSelector) : node
  node.setAttribute('data-draggable-item', '')
  return pannable(node, {
    onStart(e, coords) {
      const evTarget = e.target as HTMLElement
      if (handler !== evTarget) return false
      e.preventDefault()
      e.stopPropagation()
      onStart && onStart(node, evTarget, coords)
    },
    onMove(event, coords) {
      if (ghostElement) {
        ghostElement.update(coords.dx, coords.dy)
        const target = event.target as HTMLElement
        onMove && onMove(node, target, coords)
      } else {
        ghostElement = createGhost(node)
      }
    },
    async onEnd(event, coords) {
      const target = event.target as HTMLElement
      let ghostTarget = node
      if (onDrop) {
        const newTarget = await onDrop(node, target, coords)
        if (newTarget) ghostTarget = newTarget
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
  node.classList.add('dragged')
  clone.style.transform = `translate3d(${gx}px, ${gy}px, 0)`
  document.body.append(clone)
  return {
    el: clone,
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