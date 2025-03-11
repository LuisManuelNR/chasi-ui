export function isEqual(a: any, b: any): boolean {
	if (a === b) return true
	// Helper function to check if a value is an object
	const isObject = (obj: any): boolean => obj !== null && typeof obj === 'object'

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

export function randomString() {
	return Math.random().toString(36).substring(2, 9)
}

export function randomColor() {
	return `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`
}

type ThrottledFunction<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T>
export function throttle<T extends (...args: any) => any>(
	func: T,
	limit: number
): ThrottledFunction<T> {
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

export function frameLoop(
	iterationByFrames: () => number,
	callback: () => void | Promise<void>
): () => void {
	let stop = false
	async function loop() {
		if (stop) return
		const iterations = iterationByFrames()
		for (let i = 0; i < iterations; i++) {
			if (stop) return
			await callback()
		}
		requestAnimationFrame(loop)
	}
	loop()
	return () => {
		stop = true
	}
}

export function normalizeText(str: string) {
	return str
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036F]/g, '')
}
