export default function (node: HTMLElement | SVGElement, option: { target: string | Element, prepend?: boolean }) {
  const targetNode = option.target instanceof Element ? option.target : document.querySelector(option.target)
  if (!targetNode) throw 'Target Element must exist on the DOM'
  if (option.prepend) {
    targetNode.prepend(node)
  } else {
    targetNode.append(node)
  }
  return {
    destroy() {
      node.remove()
    }
  }
}