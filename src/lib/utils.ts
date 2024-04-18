import d3Ticks from './CGraph/ticks.js'

export function isEqual(a: any, b: any): boolean {
  if (a === b) return true
  // Helper function to check if a value is an object
  const isObject = (obj: any): boolean => obj !== null && typeof obj === "object"

  // Arrays: compare lengths first, then elements
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false
    }
    return true
  }

  // Objects: compare keys and then values
  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) return false

    for (const key of keysA) {
      if (!keysB.includes(key) || !isEqual(a[key], b[key])) return false
    }
    return true
  }

  return false
}

export function distance(p1: [number, number], p2: [number, number]) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
}

export function isInside(point: [number, number], polygonVertices: [number, number][]) {
  const x = point[0]
  const y = point[1]
  let inside = false
  for (let i = 0, j = polygonVertices.length - 1; i < polygonVertices.length; j = i++) {
    const xi = polygonVertices[i][0]
    const yi = polygonVertices[i][1]
    const xj = polygonVertices[j][0]
    const yj = polygonVertices[j][1]

    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
    if (intersect) inside = !inside
  }
  return inside
}

export function polyArea(vertices: [number, number][]) {
  let total = 0
  for (let i = 0, l = vertices.length; i < l; i++) {
    let addX = vertices[i][0]
    let addY = vertices[i === vertices.length - 1 ? 0 : i + 1][1]
    let subX = vertices[i === vertices.length - 1 ? 0 : i + 1][0]
    let subY = vertices[i][1]
    total += (addX * addY * 0.5)
    total -= (subX * subY * 0.5)
  }
  return Math.abs(total)
}

export function max(data: number[]): number {
  let max = Number.NEGATIVE_INFINITY
  for (let i = 0; i < data.length; i++) {
    const point = data[i]
    max = Number(point > max ? point : max)
  }
  return max
}

export function min(data: number[]): number {
  let min = Number.POSITIVE_INFINITY
  for (let i = 0; i < data.length; i++) {
    const point = data[i]
    min = Number(point < min ? point : min)
  }
  return min
}

export function linearScale(point: number, minD: number, maxD: number, minR: number, maxR: number): number {
  if (minD === maxD) return point
  const ratio = (maxR - minR) / (maxD - minD)
  return minR + ratio * (point - minD)
}

export function zoom(point: number, z: number, centroid: number) {
  const t = point - centroid
  const zoom = z < 0 ? t * 0.9 : t * 1.1
  return zoom + centroid
}

export function randomString() {
  return Math.random().toString(36).substring(2, 9)
}

export function randomNumber(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}

export function randomColor() {
  return `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`
}

export function ticks(min: number, max: number, count: number): number[] {
  return d3Ticks(min, max, count)
}

type ThrottledFunction<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T>
export function throttle<T extends (...args: any) => any>(func: T, limit: number): ThrottledFunction<T> {
  let inThrottle: boolean
  let lastResult: ReturnType<T>

  return function (this: any): ReturnType<T> {
    const args = arguments
    const context = this

    if (!inThrottle) {
      inThrottle = true

      setTimeout(() => (inThrottle = false), limit)
      // @ts-ignore
      lastResult = func.apply(context, args)
    }

    return lastResult
  }
}

export function isAnimating(element: Element) {
  const animations = element.getAnimations()
  if (animations.length > 0) {
    return true
  }

  const computedStyles = window.getComputedStyle(element)
  const transitions = computedStyles.transitionProperty.split(', ')

  for (let i = 0; i < transitions.length; i++) {
    const duration = parseFloat(computedStyles.transitionDuration.split(', ')[i])

    if (duration > 0) {
      return true
    }
  }

  return false
}

export function runOnFrames(fps = 30, callback: () => void) {
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