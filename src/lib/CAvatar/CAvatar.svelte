<script lang="ts">
  export let frame = false
  export let text = ''
  export let size = '48px'

  let klass = ''
  export { klass as class }

  function transform () {
    if (text) {
      const match = text.match(/\b([A-Z])/g)
      if (match) {
        return match.splice(0, 2).join(' ')
      }
    }
    return ''
  }
</script>

<div class="c-avatar {klass}" class:frame style="--size: {size};">
  <div class="c-avatar-container">
    <slot>
      <span>{transform()}</span>
    </slot>
  </div>
</div>

<style global lang="scss">
  .c-avatar {
    --scale: 1.1;
    width: var(--size);
    height: var(--size);
    font-weight: 600;
    border-radius: var(--border-r4);
    &.frame {
      --size: 45px;
      outline: 2px solid;
      padding: 2px;
    }
    .c-avatar-container {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      overflow: hidden;
      img {
        transform: scale(var(--scale));
        transition: transform .2s;
      }
      span {
        white-space: nowrap;
        width: 100%;
        height: 100%;
        display: grid;
        place-content: center;
      }
    }
    &:hover {
      --scale: 1.3;
    }
  }
</style>
