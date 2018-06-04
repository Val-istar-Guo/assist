<template>
  <div>
    <span class="content">
      <slot><span class="placeholder">{{placeholder}}</span></slot>
      </span>
    <i class="iconfont icon-right" />
  </div>
</template>
<script>
export default {
  props: {
    placeholder: String,
  }
}
</script>
<style lang="postcss" scoped>
.content {
  display: inline-block;
  margin-right: 20px;
  font-size: 32px;
  line-height: 45px;
  vertical-align: middle;
}

.iconfont {
  line-height: 45px;
  vertical-align: middle;
}

.placeholder {
  color: #999999;
}
</style>
