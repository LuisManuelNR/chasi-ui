export class Draggable {
  position: { x: number, y: number, centerX: number, centerY: number }
  element: HTMLElement
  ghost: HTMLElement | undefined
  bound: {
    top: number,
    left: number,
    bottom: number,
    right: number,
    height: number,
    width: number,
    outerHeight: number,
    outerWidth: number
  }
  constructor(el: HTMLElement) {
    this.bound = getBound(el)
    const centerX = this.bound.left + this.bound.width / 2
    const centerY = this.bound.top + this.bound.height / 2
    this.position = { x: 0, y: 0, centerX, centerY }
    this.element = el
  }

  translate(deltaX: number, deltaY: number) {
    this.position.x += deltaX
    this.position.y += deltaY
    this.position.centerX += deltaX
    this.position.centerY += deltaY

    this.element.style.width = `${this.bound.width}px`
    this.element.style.height = `${this.bound.height}px`
    this.element.style.boxShadow = 'var(--shadow-5)'
    this.element.style.pointerEvents = 'none'

    if (!this.ghost && this.element.parentElement) {
      this.ghost = this.element.cloneNode() as HTMLElement
      this.ghost.style.opacity = '0'
      this.element.parentElement.append(this.ghost)
    }

    this.element.style.position = 'fixed'
    this.element.style.zIndex = '9999'
    this.element.style.top = `${this.bound.top}px`
    this.element.style.left = `${this.bound.left}px`
    this.element.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`
  }

  release(deltaX: number, deltaY: number): Promise<void> {
    return new Promise(resolve => {
      this.element.style.transition = ''
      // this.element.style.transform = ''
      const x = this.position.x
      const y = this.position.y
      this.translate(deltaX, deltaY)
      if (x !== 0 || y !== 0) {
        onTransitionEnd(this.element, () => {
          this.dispose()
          resolve()
        })
      } else {
        this.dispose()
        resolve()
      }
    })
  }

  private dispose() {
    this.element.style.width = ''
    this.element.style.height = ''
    this.element.style.pointerEvents = ''

    this.element.style.position = ''
    if (this.ghost) {
      this.ghost.remove()
      this.ghost = undefined
    }
    this.element.style.zIndex = ''
    this.element.style.transition = ''
    this.element.style.top = ''
    this.element.style.left = ''
    this.element.style.transform = ''
    this.element.style.boxShadow = ''
  }
}

export function getBound(element: HTMLElement) {
  const { top, bottom, left, right, height, width } = element.getBoundingClientRect()
  const { marginTop, marginBottom, marginLeft, marginRight } = window.getComputedStyle(element)
  const _top = top - parseInt(marginTop)
  const _bottom = bottom + parseInt(marginBottom)
  const _left = left - parseInt(marginLeft)
  const _right = right + parseInt(marginRight)
  const outerWidth = _right - _left
  const outerHeight = _bottom - _top
  return {
    top: _top,
    bottom: _bottom,
    left: _left,
    right: _right,
    height,
    width,
    outerWidth,
    outerHeight
  }
}

export function isInside(point: [number, number], vs: [number, number][]) {
  const x = point[0]
  const y = point[1]
  let inside = false
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0]
    const yi = vs[i][1]
    const xj = vs[j][0]
    const yj = vs[j][1]

    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
    if (intersect) inside = !inside
  }
  return inside
}

export function draw(callback: (requestId: number) => void, fps = 30) {
  const interval = 1000 / fps
  let now: number
  let then = Date.now()
  let delta: number

  function update() {
    const requestId = requestAnimationFrame(update)

    now = Date.now()
    delta = now - then

    if (delta > interval) {
      then = now - (delta % interval)

      callback(requestId)
    }
  }
  return update
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
