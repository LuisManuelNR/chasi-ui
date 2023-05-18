function createDebugLine(initialX: number, initialY: number) {
  let x = initialX
  let y = initialY
  const line = document.createElement('div')
  line.style.backgroundColor = 'red'
  line.style.width = '100vw'
  line.style.height = '2px'
  line.style.position = 'fixed'
  line.style.left = `${x}px`
  line.style.top = `${y}px`
  document.body.append(line)
  return {
    set(newX: number, newY: number) {
      x = newX
      y = newY
      line.style.left = `${x}px`
      line.style.top = `${y}px`
    },
    update(dx: number, dy: number) {
      x += dx
      y += dy
      line.style.left = `${x}px`
      line.style.top = `${y}px`
    }
  }
}

export function createScroller(el: Element, initialX: number, initialY: number) {
  const scroller = getScrollParent(el)
  const offset = window.innerHeight / 2
  const line = createDebugLine(0, offset)
  console.log(offset, window.innerHeight)
  // let x = 0
  let y = initialY - offset
  scroller.style.scrollBehavior = 'auto'
  const dispose = runOnFrames(() => {
    const stepX = 0
    const stepY = Math.pow(y * 0.002, 17)
    console.log(stepY)
    if (stepY >= 1 && stepY <= -1) return
    scroller.scrollBy(stepX, stepY)
  }, 60)

  return {
    updateCursor(dx: number, dy: number) {
      // x += dx
      y += dy
    },
    dispose
  }
}
export function runOnFrames(callback: () => void, fps = 30) {
  const interval = 1000 / fps
  let now: number
  let then = Date.now()
  let delta: number

  let requestId: number
  function update() {
    requestId = requestAnimationFrame(update)

    now = Date.now()
    delta = now - then

    if (delta > interval) {
      then = now - (delta % interval)

      callback()
    }
  }
  update()
  return () => cancelAnimationFrame(requestId)
}
export function cloneElement(el: Element) {
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
    disposing: false,
    translate(dx: number, dy: number) {
      x += dx
      y += dy
      clone.style.transform = `translate3d(${x}px, ${y}px, 0)`
    },
    dispose(): Promise<void> {
      this.disposing = true
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
          this.disposing = false
          clone.remove()
          resolve()
        } else {
          onTransitionEnd(clone, () => {
            clone.remove()
            this.disposing = false
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
export function getHeight(element: Element): number {
  const elBound = element.getBoundingClientRect()
  const nextBound = element.nextElementSibling
    ? element.nextElementSibling.getBoundingClientRect()
    : { top: 0 }
  const diff = nextBound.top - elBound.top
  return diff > 0 ? diff : elBound.height
}
export function randomStr() {
  return Math.random().toString(36).slice(-5)
}
export function getElementIndex(el: Element) {
  if (!el.parentElement) return 0
  let i = 0
  while (el.parentElement.children[i] != el) i++
  return i
}
export function getScrollParent(element: Element) {
  let style = getComputedStyle(element)
  const excludeStaticParent = style.position === 'absolute'
  const overflowRegex = /(auto|scroll)/

  if (style.position === 'fixed') return document.body
  if (element.parentElement) {
    // @ts-ignore
    for (let parent = element; (parent = parent.parentElement);) {
      style = getComputedStyle(parent)
      if (excludeStaticParent && style.position === 'static') {
        continue
      }
      if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
        return parent as HTMLElement
      }
    }
  }

  return document.documentElement
}