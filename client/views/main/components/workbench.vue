<script>
import { mapGetters } from 'vuex'

export default {
  render(h) {
    const { focusView, views } = this.$store.getters

    if (focusView) {
      return h('div', { class: 'container' }, [h(focusView.component)])
    } else if (!views.length) {
      return h('div', { class: 'container' }, [
        h('p', { class: 'warn' }, ['请安装至少一个视图插件才可以管理任务']),
      ])
    } else {
      return h('div', { class: 'container' }, [
        h('p', { class: 'placeholder' }, ['Assist任务管理系统']),
      ])
    }
  }
}
</script>

<style lang="postcss" scoped>
.container {
  position: relative;
  overflow: hidden;

  & .warn {
    margin-top: 20vh;
    font-size: 32px;
    text-align: center;
  }

  & .placeholder {
    font-size: 42px;
    text-align: center;
    margin-top: 20vh;
    letter-spacing: 2px;
    color: #999;
  }
}

</style>
