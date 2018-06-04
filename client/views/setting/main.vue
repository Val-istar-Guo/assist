<template>
  <div>
    <top-menu go-back upload>设置</top-menu>
    <field title="用户">
      <plain-text>Val.istar.Guo</plain-text>
    </field>
    <field title="插件" @click="$router.push('/setting/plugins')">
      <more-options />
    </field>
    <field title="自动同步" @click="modifySetting({ autoSync: !setting.autoSync})" >
      <toggle :open="setting.autoSync"/>
    </field>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'


export default {
  computed: {
    ...mapState(['setting']),
  },
  methods: {
    ...mapActions({
      modifySetting: 'system.modifySetting',
    }),
  },
}
</script>
<style lang="postcss" scoped>

</style>
