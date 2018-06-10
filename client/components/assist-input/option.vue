<template>
  <div class="option" @click="emitClickEvent"><slot></slot></div>
</template>
<script>
export default {
  props: {
    value: { required: true },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    emitClickEvent() {
      if (!disabled) this.$emit('click', this.value)
    },
  },
}
</script>
<style lang="postcss" scoped>
.option {
  padding: 5px 10px;
}
</style>
