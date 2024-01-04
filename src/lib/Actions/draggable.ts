import pannable from './pannable.js'

type ReturnTypeDrop = { ghostDuration?: number, ghostTarget?: HTMLElement } | void
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
          ghostTarget = returnedGhostSettings.ghostTarget || node
          duration = returnedGhostSettings.ghostDuration || duration
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
  clone.style.position = 'fixed'
  clone.style.top = '0'
  clone.style.left = '0'
  clone.style.pointerEvents = 'none'
  clone.style.transition = 'none'
  clone.style.zIndex = '9999'
  clone.style.boxShadow = 'var(--shadow-4)'
  clone.style.width = `${width}px`
  clone.style.height = `${height}px`
  let gx = left
  let gy = top
  clone.style.transform = `translate3d(${gx}px, ${gy}px, 0)`
  document.body.append(clone)
  node.style.opacity = '0'
  node.style.transition = 'none'
  node.style.animation = 'none'
  node.style.pointerEvents = 'none'
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
        node.style.opacity = ''
        node.style.transition = ''
        node.style.animation = ''
        node.style.pointerEvents = ''
      }, duration)
    }
  }
}