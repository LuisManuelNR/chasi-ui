type ObserverParams = {
  onIntersect: (entry?: IntersectionObserverEntry) => void,
  once?: boolean
}
declare global {
  interface Window { observer: IntersectionObserver }
}

export default function (node: HTMLElement, { onIntersect, once = true }: ObserverParams): { destroy: () => void } {
  if (typeof window !== 'undefined') {
    if ('IntersectionObserver' in window) {
      window.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const isIntersecting = entry.isIntersecting || entry.intersectionRatio > 0
          if (!isIntersecting) return
          onIntersect(entry)
          if (once) {
            window.observer.unobserve(node)
          }
        })
      })
      window.observer.observe(node)
    }
  }
  return {
    destroy() {
      window.observer.unobserve(node)
    }
  }
}