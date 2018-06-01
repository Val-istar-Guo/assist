<template lang="html">
  <div>
    <document-title>Assist</document-title>
    <loading v-if="applicationStatus === 'initization'" />
    <navigation v-if="applicationStatus === 'running'" />
    <workbench v-if="applicationStatus === 'running'"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import navigation from './components/navigation'
import workbench from './components/workbench'
import loading from './components/loading'


export default {
  initialData: async function ({ store, route }) {
    await store.dispatch('system.init')
    await store.dispatch('system.storage')
  },
  components: { navigation, workbench, loading },
  computed: mapState(['applicationStatus']),
}
</script>

<style lang="postcss" scoped>
</style>
