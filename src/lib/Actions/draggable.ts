import pannable from './pannable.js'

type DraggableEvent<C> = (source: HTMLElement, target: HTMLElement, coords: C) => void | Promise<void>

type DraggableOption = {
  onDrop?: DraggableEvent<{ x: number, y: number }>
  onMove?: DraggableEvent<{ x: number, y: number, dx: number, dy: number }>
  onStart?: DraggableEvent<{ x: number, y: number }>
  handlerSelector?: string
  duration?: number
}

export default function (node: HTMLElement, { onDrop, onMove, onStart, handlerSelector, duration = 250 }: DraggableOption) {
  let ghostElement: ReturnType<typeof createGhost> | null = null
  createStyles()
  const handler = handlerSelector ? node.querySelector(handlerSelector) : node
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
      onDrop && await onDrop(node, target, coords)
      ghostElement && ghostElement.dispose(duration)
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
    dispose(duration: number) {
      const { left, top } = node.getBoundingClientRect()
      clone.style.transition = `transform ${duration}ms ease`
      clone.style.transform = `translate3d(${left}px, ${top}px, 0)`
      setTimeout(() => {
        clone.remove()
        node.classList.remove('dragged')
      }, duration)
    }
  }
}

function createStyles() {
  if (!document.querySelector('#draggable-styles')) {
    const style = document.createElement('style')
    style.setAttribute('id', 'draggable-styles')
    style.innerHTML = `
      .ghost {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        transition: none;
        z-index: 9999;
        box-shadow: var(--shadow-4);
      }
      .dragged {
        opacity: 0.5;
        transition: none !important;
        animation: none !important;
        pointer-events: none;
      }`
    document.getElementsByTagName('head')[0].appendChild(style)
  }
}