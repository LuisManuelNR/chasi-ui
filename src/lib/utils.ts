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
