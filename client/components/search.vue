<template slot="extend">
  <div class="search">
    <input
      :placeholder="placeholder"
      ref="input"
      :value="value"
      @change="$emit('change', $event.target.value)"
    />
    <div class="operation">
      <i class="iconfont icon-search" @click="$emit('search', $refs.input.value)" />
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: String,
    value: String,
  }
}
</script>
<style lang="postcss" scoped>
.search {
  position: relative;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;

  & > * {
    vertical-align: middle;
  }

  & input {
    display: inline-block;
    width: 60vw;
    border: 1px solid #e5e5e5;
    height: 46px;
    padding: 2px 30px;
    margin-top: 7px;
    margin-bottom: 8px;
    border-radius: 23px;
    outline: none;
    font-size: 24px;
  }

  & .operation {
    display: inline-block;
    margin-left: 20px;

    & .iconfont + .iconfont {
      margin-left: 10px;
    }
  }
}
</style>
