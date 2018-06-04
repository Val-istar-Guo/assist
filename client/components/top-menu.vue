<template>
  <div class="container">
    <div class="menu">
      <div class="left-operation">
        <i v-if="goBack" class="setting-button iconfont icon-left available" @click="$router.go(-1)" />
      </div>
      <div class="content"><slot></slot></div>

      <div class="right-operation">
        <i
          v-if="upload"
          class="setting-button iconfont icon-upload"
        />
        <i
          v-if="setting"
          class="setting-button iconfont icon-setting available"
          @click="$router.push('/setting')"
        />
      </div>
    </div>

    <div class="extend">
      <slot name="extend"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    setting: Boolean,
    upload: Boolean,
    goBack: Boolean,
  },
}
</script>
<style lang="postcss" scoped>
.container {
  width: 100%;
  /* box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2); */
  border-bottom: 1px solid #e5e5e5;
}

.menu {
  position: relative;
  width: 100%;
  height: 120px;
  font-size: 24px;
  letter-spacing: 6px;
  line-height: 33px;
}

.content {
  box-sizing: border-box;
  margin: 0;
  padding: 0 180px;
  text-align: center;
  line-height: 120px;
  font-weight: bolder;
}

.left-operation,
.right-operation {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  & > i {
    padding: 30px 5px;
  }
}

.left-operation {
  left: 25px;
}

.right-operation {
  right: 25px;
}

</style>
