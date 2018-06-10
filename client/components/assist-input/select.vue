<template>
  <div class="select">
    <div class="input"></div>
    <div click="options" @click="clickOptions">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: String,
  },

  data() {
    return {
      selected: null,
    }
  },

  methods: {
    clickOptions(option) {
      this.selected = option
      this.$emit('change', option)
    },
  },
}
</script>
<style lang="postcss" scoped>

</style>
