<script>
import { mapGetters } from 'vuex'

export default {
  render(h) {
    const { focuseView } = this.$store.getters

    if (focuseView) {
      console.log(focuseView.component)
      return h('div', { class: 'container' }, [h(focuseView.component)])
    } else {
      return h('div', { class: 'container' }, [
        h('p', { class: 'warn' }, ['请安装至少一个视图插件才可以管理任务']),
      ])
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
