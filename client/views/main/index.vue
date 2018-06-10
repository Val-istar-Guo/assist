<template lang="html">
  <div>
    <top-menu upload setting>{{title}}</top-menu>
    <loading v-if="applicationStatus === 'initization'" />
    <workbench class="workbench" v-if="applicationStatus === 'running'"/>
    <navigation class="navigation" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import navigation from './components/navigation'
import workbench from './components/workbench'
import loading from './components/loading'


export default {
  initialData: async function ({ store, route }) {
    await store.dispatch('system.init')
  },
  components: { navigation, workbench, loading },
  computed: {
    ...mapGetters(['applicationStatus', 'focusView']),
    title() {
      if (this.focusView) return this.focusView.displayName

      return 'Assist'
    },
  }
}
</script>

<style lang="postcss" scoped>
.navigation {
  position: absolute;
  width: 100%;
  height: 120px;
  bottom: 0;
  border-top: 1px solid #e5e5e5;
}

.workbench {
  height: calc(100vh - 120px -120px);
}
</style>
