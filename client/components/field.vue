<template>
  <div class="field" @click="$emit('click')">
    <span class="title">{{title}}</span>
    <span class="content"><slot></slot></span>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
  },
}
</script>
<style lang="postcss" scoped>
.field {
  padding: 30px;
  border-bottom: 1px solid #e5e5e5;

  display: flex;
  justify-content: space-between;
}

.title {
  display: inline-block;
  font-size: 32px;
  line-height: 45px;
  padding: 0;
  margin: 0;
}

.content {
  display: inline-block;
  font-size: 0;
  padding: 0;
  margin: 0;
  /* height: 45px; */
}
</style>
