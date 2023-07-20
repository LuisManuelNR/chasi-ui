export default function (node: HTMLElement, option: { target: string, prepend?: boolean }): { destroy: () => void } {
  const targetNode = document.querySelector(option.target)
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