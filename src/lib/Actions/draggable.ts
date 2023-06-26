import { createEventDispatcher } from 'svelte'
import pannable from './pannable'

interface IDraggableOption<T> {
  data?: T
}

export default function <T>(node: HTMLElement, opt: IDraggableOption<T> = {}): { destroy?: () => void } {
  let ghost: ReturnType<typeof createGhost> | undefined
  const HANDLER_SELECTOR = '.handler'
  let dragging = false
  const { destroy } = pannable(node, {
    onStart(coords, ev) {
      const target = ev.target as HTMLElement
      if (!target) return
      const handler = target.closest(HANDLER_SELECTOR)
      if (!handler) return
      dragging = true
    },
    onMove(coords, ev) {
      if (dragging) {
        if (!ghost) ghost = createGhost(node)
        ghost.translate(coords.dx, coords.dy)
        node.dispatchEvent(
          new CustomEvent('panmove')
        )
      }
    },
    onEnd(coords, ev) {
      if (dragging) {
        if (ghost) {
          ghost.dispose()
          ghost = undefined
        }
        dragging = false
      }
    },
  })

  return {
    destroy
  }
}

function createGhost(el: Element) {
  const { top, left, width, height } = el.getBoundingClientRect()
  const clone = el.cloneNode(true) as HTMLElement
  clone.style.position = 'fixed'
  clone.style.top = `${top}px`
  clone.style.left = `${left}px`
  clone.style.width = `${width}px`
  clone.style.height = `${height}px`
  clone.style.pointerEvents = 'none'
  clone.style.transition = 'none'
  clone.style.opacity = '0.5'

  let x = 0
  let y = 0

  document.body.append(clone)
  return {
    translate(dx: number, dy: number) {
      x += dx
      y += dy
      clone.style.transform = `translate3d(${x}px, ${y}px, 0)`
    },
    dispose(): Promise<void> {
      return new Promise((resolve) => {
        const elBound = el.getBoundingClientRect()
        const dy = elBound.y - top - y
        const dx = elBound.x - left - x
        clone.style.transition = 'all 100ms'
        clone.style.opacity = '1'
        clone.style.width = `${elBound.width}px`
        clone.style.height = `${elBound.height}px`
        if (!x && !y) {
          this.translate(dx, dy)
          clone.remove()
          resolve()
        } else {
          onTransitionEnd(clone, () => {
            clone.remove()
            resolve()
          })
          this.translate(dx, dy)
        }
      })
    }
  }
}

export function onTransitionEnd(el: HTMLElement, callback: (e: TransitionEvent) => void) {
  const getTransitionName = () => {
    const transitions = {
      transition: 'transitionend',
      OTransition: 'oTransitionEnd',
      MozTransition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd'
    }
    for (const key in transitions) {
      //@ts-ignore
      if (el.style[key] !== undefined) {
        //@ts-ignore
        return transitions[key]
      }
    }
  }
  el.addEventListener(getTransitionName(), callback, { once: true })
}