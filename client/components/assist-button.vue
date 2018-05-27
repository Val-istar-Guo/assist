<template>
  <button
    :class="['assist-button', size, type]"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: 'middle',
      validator: value => ['small', 'middle', 'large'].includes(value),
    },
    type: {
      type: String,
      default: 'normal',
      validator: value => ['normal', 'danger', 'unrecommended'].includes(value),
    }
  },
}
</script>
<style lang="postcss" scoped>
:root {
  --normal: #083358;
  --danger: #FC3C3C;
  --unrecomended: #D8D8D8;
}

.assist-button {
  background: transparent;
  border: 1px solid #083358;
  border-radius: 4px;

  &.small {
    font-size: 24px;
    padding: 10px 20px;
  }

  &.middle {
    font-size: 32px;
    padding: 10px 30px;
  }

  &.large {
    font-size: 36px;
  }

  &.normal {
    color: var(--normal);
    border-color: var(--normal);
  }

  &.danger {
    color: var(--danger);
    border-color: var(--danger);
  }

  &.unrecomended {
    color: var(--unrecomended);
    border-color: var(--unrecomended);
  }
}
</style>
