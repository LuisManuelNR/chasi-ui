<script lang="ts">
  import pannable from '../Actions/pannable'
  import { Draggable, getBound, draw, isInside } from './draggable-api'

  type T = $$Generic
  export let list: T[] = []
  export let itemClass = '.draggable'
  export let contentClass = ''
  
  let inParent = false
  let selected: Draggable | undefined
  let allowTransition = false
  let runUpdate = false
  let selectedIndex = -1
  let targetIndex = -1
  let handler: HTMLElement | null

  function draggableList (node: HTMLElement) {

    function eachChild (callback: (child: HTMLElement, i: number) => void) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i] as HTMLElement
        callback(child, i)
      }
    }

    let bounds: Record<number, {top:number, right:number, bottom:number, left:number, height:number, width:number}> = {}

    function checkChildCollission (requestId: number) {
      if (!runUpdate) return cancelAnimationFrame(requestId)
      const sel = selected
      if (sel) {
        targetIndex = selectedIndex
        let target = false
        eachChild((child, i) => {
          if (child !== sel.element && child !== sel.ghost) {
            child.style.transition = allowTransition ? '' : 'none'
            child.style.transform = ''
            const ch = bounds[i]
            const inside = isInside(
              [sel.position.centerX, sel.position.centerY],
              [
                [ch.left, ch.top],
                [ch.right, ch.top],
                [ch.right, ch.bottom],
                [ch.left, ch.bottom],
              ]
            )
            if (inside) {
              target = true
              targetIndex = i
            }
            if (target) {
              child.style.transform = `translateY(${sel.bound.outerHeight}px)`
            }
          }
        })
        allowTransition = true
      }
    }

    const update = draw(checkChildCollission, 24)

    return pannable(node, {
      onStart: (e) => {
        const el = e.target as HTMLElement
        handler = el.closest<HTMLElement>('.handler')
        if (!handler) return
        e.preventDefault()
        const grabbed = handler.closest<HTMLElement>(itemClass)
        if (grabbed) {
          selected = new Draggable(grabbed)
          let offset = 0
          eachChild((child, i) => {
            const cBound = getBound(child)
            if (child !== grabbed) {
              const top = cBound.top - offset
              const right = cBound.right
              const bottom = cBound.bottom - offset
              const left = cBound.left
              const height = cBound.height
              const width = cBound.width
              bounds[i] = {top, right, bottom, left, height, width}
            } else {
              selectedIndex = i
              targetIndex = i
              offset = selected!.bound.outerHeight
            }
          })
        }
      },
      onMove: (e, coords) => {
        if (selected) {
          selected.element.style.transition = 'none'
          selected.translate(coords.dx, coords.dy)
          if (!runUpdate) {
            document.body.style.cursor = 'grabbing'
            runUpdate = true
            update()
          }
          const el = document.elementFromPoint(coords.x, coords.y)
          if (el) {
            inParent = !!el.closest('.c-draggablelist')
          }
        }
      },
      onEnd: async () => {
        if (selected) {
          const target = bounds[targetIndex]
          let objective = targetIndex
          document.body.style.cursor = ''
          if (target) {
            const dx = target.left - (selected.position.x + selected.bound.left)
            const dy = target.top - (selected.position.y + selected.bound.top)
            await selected.release(dx, dy)
          } else if (inParent) {
            const gbound = getBound(selected.ghost!)
            const dx = gbound.left - (selected.position.x + selected.bound.left)
            const dy = gbound.top - (selected.position.y + selected.bound.top)
            await selected.release(dx, dy)
            objective = node.childElementCount
          } else {
            await selected.release(-selected.position.x, -selected.position.y)
          }
          runUpdate = false
          if (selectedIndex !== objective) {
            const realTarget = selectedIndex >= objective ? objective : objective - 1
            moveItem(selectedIndex, realTarget)
          }
          selected = undefined
          allowTransition = false
          eachChild(child => {
            child.style.transition = 'none'
            child.style.transform = ''
          })
          selectedIndex = -1
          targetIndex = -1
          inParent = false
          bounds = {}
        }
      }
    })
  }

  function moveItem (from: number, to: number) {
    let temp = list[from]
    list = [...list.slice(0, from), ...list.slice(from + 1)]
    list = [...list.slice(0, to), temp, ...list.slice(to)]
  }

</script>

<div class="c-draggablelist border-r2 {contentClass}" use:draggableList>
  <slot />
</div>

<style global lang="scss">
  .c-draggablelist {
    overflow-anchor: none;
    transition: background 150ms cubic-bezier(0.2, 0, 0, 1);
    & > * {
      transition: transform 150ms cubic-bezier(0.2, 0, 0, 1);
      will-change: transform;
    }
    .handler {
      cursor: grab;
    }
  }
</style>