<template>
  <div class="close-button" @click="$emit('click', $event)">
    <div class="left-line"></div>
    <div class="right-line"></div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="postcss" scoped>
.left-line,
.right-line {
  display: block;
  width: 40px;
  height: 4px;
  background: #D8D8D8;
  transform-origin: 50% 0%;
}

.left-line {
  transform: rotate(45deg);
}

.right-line {
  transform: rotate(135deg);
}
</style>
