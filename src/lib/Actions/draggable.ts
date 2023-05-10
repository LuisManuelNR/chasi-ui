import pannable from './pannable'

interface DraggableActionOptions {
  dropZoneSelector: string
  handlerSelector: string
  draggableSelector: string
  currentDropZoneClass?: string
  onChange: (from: HTMLElement, to: HTMLElement) => void
}

export default function (node: HTMLElement, { dropZoneSelector, handlerSelector, draggableSelector, currentDropZoneClass = 'current-drop-zone', onChange }: DraggableActionOptions) {
  let ghost: ReturnType<typeof cloneElement> | null
  let height = 0
  let displace: ReturnType<typeof createDisplacement>
  node.style.overflow = 'hidden'
  let draggable: HTMLElement | null
  let LastDropZone: HTMLElement | null
  const { destroy } = pannable(node, {
    onStart(event, coords) {
      const evTarget = event.target as HTMLElement
      const handler = evTarget.closest(handlerSelector)
      if (!handler) return
      draggable = handler.closest(draggableSelector) as HTMLElement
      if (!draggable) return
      LastDropZone = draggable.parentElement
      event.preventDefault()
      height = getHeight(draggable)
      ghost = cloneElement(draggable)
      displace = createDisplacement(node, draggable, draggableSelector)
      draggable.style.opacity = '0'
      displace(height, coords, false)
      if (draggable.parentElement) {
        draggable.parentElement.append(draggable)
      }
    },
    onMove(event, coords) {
      if (ghost && draggable) {
        ghost.translate(coords.dx, coords.dy)
        const evTarget = document.elementFromPoint(coords.x, coords.y) as HTMLElement
        const dropZone = evTarget.closest(dropZoneSelector) as HTMLElement
        if (dropZone && LastDropZone !== dropZone) {
          if (LastDropZone) LastDropZone.classList.remove(currentDropZoneClass)
          LastDropZone = dropZone
          LastDropZone.classList.add(currentDropZoneClass)
          dropZone.append(draggable)
        }
        requestAnimationFrame(() => {
          displace(height, coords, true)
        })
      }
    },
    onEnd: async (event, coords) => {
      const dropZone = LastDropZone
      if (dropZone && draggable) {
        dropZone.classList.remove(currentDropZoneClass)
        if (dropZone.children.length) {
          let inserted
          for (let i = 0; i < dropZone.children.length; i++) {
            const el = dropZone.children[i] as HTMLElement
            el.style.transition = 'none'
            if (el.style.transform && !inserted) {
              inserted = true
              dropZone.insertBefore(draggable, el)
            }
            if (i === dropZone.children.length - 1 && !inserted) {
              dropZone.append(draggable)
            }
            el.style.transform = ''
          }
        } else {
          dropZone.append(draggable)
        }
        if (ghost) {
          await ghost.dispose(draggable)
        }
        draggable.style.opacity = ''
      }
      LastDropZone = null
      draggable = null
      ghost = null
    },
  })

  return { destroy }
}

function getHeight(element: Element): number {
  const elBound = element.getBoundingClientRect()
  const nextBound = element.nextElementSibling ? element.nextElementSibling.getBoundingClientRect() : { top: 0 }
  const diff = nextBound.top - elBound.top
  return diff > 0 ? diff : elBound.height
}

function cloneElement(el: Element) {
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
    dispose(node: HTMLElement): Promise<void> {
      return new Promise(resolve => {
        const elBound = node.getBoundingClientRect()
        const dy = elBound.y - top - y
        const dx = elBound.x - left - x
        clone.style.transition = 'all 250ms'
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

function createDisplacement(root: Element, selected: Element, draggableSelector: string) {
  const items = root.querySelectorAll(draggableSelector)
  return (amount = 100, cursor: { x: number, y: number }, transition: boolean) => {
    for (let i = 0; i < items.length; i++) {
      const el = items[i] as HTMLElement
      if (el !== selected) {
        el.style.transition = transition ? 'transform 150ms' : 'none'
        const { x, y, height, width } = el.getBoundingClientRect()
        // if (cursor.x < x || cursor.x > x + width) {
        if (el.parentElement !== selected.parentElement) {
          el.style.transform = ''
        } else if (cursor.y >= y + height / 2) {
          el.style.transform = ''
        } else {
          el.style.transform = `translate3d(0px, ${amount}px, 0)`
        }
      }
    }
  }
}

function onTransitionEnd(el: HTMLElement, callback: (e: TransitionEvent) => void) {
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