<template>
  <div :class="['toggle', open ? 'open' : '']">
    <div class="button"></div>
  </div>
</template>
<script>
export default {
  props: {
    open: Boolean,
  }
}
</script>
<style lang="postcss" scoped>
.toggle {
  display: inline-block;
  padding: 0;
  margin: 0;

  height: 43px;
  width: 80px;
  border-radius: 21.5px;
  border: 1px solid #e5e5e5;
  transition: background .2s linear;

  &.open {
    background: #0F4471;
  }
}

.button {
  background: #fff;
  width: 43px;
  height: 43px;
  border-radius: 21.5px;
  transition: transform .2s ease-out;
  box-shadow: inset 0 -1px 2px 2px #fafafa, 0 0px 2px 2px #e7e7e7;

  @nest .open & {
    transform: translateX(37px);
  }
}



</style>
