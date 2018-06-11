<template>
  <div class="scroll-bar">
    <ul>
      <li
        v-for="view in views"
        :key="view.name"
        :class="[{ active: isActive(view) }, 'item']"
        @click="focus(view.name)"
      >
        <i class="iconfont large icon-form available" />
        <span class="name">{{view.displayName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  computed: {
    ...mapGetters(['views', 'focusView']),
  },
  methods: {
    isActive(view) {
      return this.focusView && view.name === this.focusView.name
    },

    ...mapActions({
      focus: 'system.interface.focusView',
    })
  },
}
</script>

<style lang="postcss" scoped>
.scroll-bar {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  font-size: 0;
}

ul {
  display: table;
  box-sizing: border-box;

  margin: 0;
  text-align: center;
  white-space:nowrap;
  overflow: hidden;
  height: 120px;
  width: 100%;
  text-align: center;
  padding: 0 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  & .item {
    display: table-cell;
    position: relative;
    list-style: none;
    padding: 0 20px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    vertical-align: middle;

    &.active {
      color:
    }

    & .name {
      display: block;
      font-size: 20px;
    }
  }
}
</style>
