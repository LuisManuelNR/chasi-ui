import { BROWSER } from 'esm-env'
import type { ActionReturn } from 'svelte/action'

type ObserverParams = {
  onIntersect: (entry?: IntersectionObserverEntry) => void,
  once?: boolean
}
declare global {
  interface Window { observer: IntersectionObserver }
}

if (BROWSER) {
  window.observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // console.log(entry)
      const isIntersecting = entry.isIntersecting || entry.intersectionRatio > 0
      if (!isIntersecting) return
      const target = entry.target
      if ('__onIntersect' in target) {
        //@ts-ignore
        target.__onIntersect(entry)
      }
    })
  })
}

export default function (node: HTMLElement, options: ObserverParams): ActionReturn {
  //@ts-ignore
  node.__onIntersect = (entry: IntersectionObserverEntry) => {
    options.onIntersect(entry)
    if (options.once === true) {
      window.observer.unobserve(node)
    }
  }
  window.observer.observe(node)
  return {
    destroy() {
      window.observer.unobserve(node)
    }
  }
}