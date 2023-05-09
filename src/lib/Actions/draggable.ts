import pannable from './pannable'

interface DraggableActionOptions {
  dropZone: string
  handler: string
  onChange: (from: HTMLElement, to: HTMLElement) => void
}

export default function (node: HTMLElement, { dropZone, handler, onChange }: DraggableActionOptions) {
  const handlerElement = (node.querySelector(handler) || node) as HTMLElement
  let ghost: ReturnType<typeof cloneElement>
  let lastParent: HTMLElement | undefined
  let height = 0
  let displace: ReturnType<typeof createDisplacement>
  const { destroy } = pannable(handlerElement, {
    onStart(event, coords) {
      height = getHeight(node)
      ghost = cloneElement(node)
      displace = createDisplacement(node)
      node.style.opacity = '0'
      if (node.parentElement) {
        displace(node.parentElement, height, coords, false)
        node.parentElement.append(node)
      }
    },
    onMove(event, coords) {
      ghost.translate(coords.dx, coords.dy)
      const el = document.elementFromPoint(coords.x, coords.y)
      if (el) {
        const dropabbleZone = el.closest(dropZone) as HTMLElement
        if (lastParent) {
          displace(lastParent, 0, coords, true)
        }
        if (dropabbleZone) {
          lastParent = dropabbleZone
          displace(dropabbleZone, height, coords, true)
        }
      }
    },
    onEnd: async (event, coords) => {
      if (lastParent) {
        let inserted
        for (let i = 0; i < lastParent.children.length; i++) {
          const el = lastParent.children[i] as HTMLElement
          el.style.transition = 'none'
          if (el.style.transform && !inserted) {
            inserted = true
            lastParent.insertBefore(node, el)
          }
          el.style.transform = ''
        }
        await ghost.dispose(node)
        node.style.opacity = ''
        node.style.backgroundColor = ''
      }
      // setTimeout(() => {
      //   onRelease(node, node)
      // }, 2000)
    },
  })

  return { destroy }
}

function getHeight(element: HTMLElement): number {
  const elBound = element.getBoundingClientRect()
  const nextBound = element.nextElementSibling ? element.nextElementSibling.getBoundingClientRect() : { top: 0 }
  const diff = nextBound.top - elBound.top
  return diff > 0 ? diff : elBound.height
}

function cloneElement(el: HTMLElement) {
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
        clone.addEventListener('transitionend', () => {
          clone.remove()
          resolve()
        })
        clone.style.transition = 'transform 150ms'
        const elBound = node.getBoundingClientRect()
        const dy = elBound.y - top - y
        const dx = elBound.x - left - x
        this.translate(dx, dy)
      })
    }
  }
}

function createDisplacement(node: HTMLElement) {
  return (parent: HTMLElement, amount = 100, cursor: { x: number, y: number }, transition: boolean) => {
    for (let i = 0; i < parent.children.length; i++) {
      const el = parent.children[i] as HTMLElement
      if (el !== node) {
        el.style.transition = transition ? '' : 'none'
        const { y, height } = el.getBoundingClientRect()
        if (cursor.y >= y + height / 2) {
          el.style.transform = ''
        } else {
          el.style.transform = `translate3d(0px, ${amount}px, 0)`
        }
      }
    }
  }
}