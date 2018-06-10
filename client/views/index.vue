<template>
  <div class="root">
    <document-title>Assist</document-title>
    <div class="scroll-view">
      <router-view></router-view>
    </div>
    <create-thing-component />
  </div>
</template>
<script>
import createThingComponent from './components/createThingComponent'


import { mapMutations } from 'vuex';
export default {
  components: { createThingComponent },
}
</script>
<style lang="postcss" scoped>
.root {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.scroll-view {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
