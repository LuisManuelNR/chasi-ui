import d3Ticks from './ticks'

export function distance (p1: [number, number], p2: [number, number]) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
}

export function isInside (point: [number, number], polygonVertices: [number, number][]) {
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

export function randomNumber (min = 0, max = 1) {
  return Math.random() * (max - min) + min
}

export function polyArea (vertices: [number, number][]) {
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

export function max (data: number[] | Record<string, number>[], key?: string) {
  let max = Number.NEGATIVE_INFINITY
  for (let i = 0; i < data.length; i++) {
    const point = data[i]
    if (typeof point === 'number') {
      max = point > max ? point : max
    } else if (key) {
      max = point[key] > max ? point[key] : max
    }
  }
  return max
}

export function min (data: number[] | Record<string, number>[], key?: string) {
  let min  = Number.POSITIVE_INFINITY
  for (let i = 0; i < data.length; i++) {
    const point = data[i]
    if (typeof point === 'number') {
      min  = point < min ? point : min 
    } else if (key) {
      min  = point[key] < min ? point[key] : min 
    }
  }
  return min 
}

export function linearScale (point: number, minD: number, maxD: number, minR: number, maxR: number): number {
  if (minD === maxD) return point
  const ratio = (maxR - minR) / (maxD - minD)
  return minR + ratio * (point - minD)
}

export function zoom (point: number, z: number, centroid: number) {
  const t = point - centroid
  const zoom = z < 0 ? t * 0.9 : t * 1.1
  return zoom + centroid
}

export function randomColor () {
  return `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`
}

export function ticks (min: number, max: number, count: number): number[] {
  return d3Ticks(min, max, count)
}