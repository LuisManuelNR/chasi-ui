import pannable from './pannable'

type onRelease = (from: HTMLElement, to: HTMLElement) => void

export default function (node: HTMLElement, onRelease: onRelease) {
  node.classList.add('draggable')
  const handler = (node.querySelector('.handler') || node) as HTMLElement
  let ghost: ReturnType<typeof cloneElement>
  let lastHit: HTMLElement
  const { height } = getBound(node)
  const { destroy } = pannable(handler, {
    onStart(event, coords) {
      console.log(height)
      ghost = cloneElement(node)
      node.classList.add('selected')
      node.style.pointerEvents = 'none'
      node.style.opacity = '0.1'
      pushDown(node, -100)
    },
    onMove(event, coords) {
      ghost.translate(coords.dx, coords.dy)
      const el = document.elementFromPoint(coords.x, coords.y)
      if (el) {
        const daggableItem = el.closest('.draggable:not(.selected)') as HTMLElement
        if (daggableItem && lastHit !== daggableItem) {
          lastHit = daggableItem
          node.style.transform
          // restore(lastHit)
          pushDown(lastHit, 100)
        }
      }
    },
    onEnd(event, coords) {
      // ghost.dispose()
      // node.classList.remove('selected')
      // node.style.pointerEvents = ''
      // node.style.opacity = ''
      // restore(lastHit)
      // onRelease(node, lastHit)
    },
  })

  return { destroy }
}

function getBound(element: HTMLElement) {
  const { top, bottom, left, right } = element.getBoundingClientRect()
  const { marginTop, marginBottom, marginLeft, marginRight } = window.getComputedStyle(element)
  const _top = top - parseInt(marginTop)
  const _bottom = bottom + parseInt(marginBottom)
  const _left = left - parseInt(marginLeft)
  const _right = right + parseInt(marginRight)
  const width = _right - _left
  const height = _bottom - _top
  return {
    top: _top,
    bottom: _bottom,
    left: _left,
    right: _right,
    width,
    height
  }
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

  let x = 0
  let y = 0

  // debug
  // clone.style.backgroundColor = 'red'

  document.body.append(clone)
  return {
    translate(dx: number, dy: number) {
      x += dx
      y += dy
      clone.style.transform = `translate3d(${x}px, ${y}px, 0)`
    },
    dispose() {
      clone.remove()
    }
  }
}

function displace(el: HTMLElement, amount = 100) {

}

function pushDown(el: HTMLElement, amount = 100) {
  if (!el.customOffset) el.customOffset = 0
  el.customOffset += amount
  el.style.translate = `0 ${el.customOffset}px`
  const next = el.nextElementSibling as HTMLElement
  if (next) {
    pushDown(next, amount)
  }
}
function restore(el: HTMLElement) {
  el.style.translate = ''
  const next = el.nextElementSibling as HTMLElement
  if (next) {
    restore(next)
  }
}