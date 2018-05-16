<template lang="html">
  <div>
    <navigation />
    <workbench />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import navigation from './components/navigation'
import workbench from './components/workbench'


export default {
  initialData: async function ({ store, route }) {
    await store.dispatch('system.init')
  },
  components: { navigation, workbench },
}
</script>

<style lang="postcss" scoped>
</style>
