<template lang="html">
  <top-menu go-back upload setting>
    <div class="scroll-bar">
      <ul class="navigator">
        <li v-for="view in views":class="[view.type === focuseViewType ? 'active' : '', 'item']">{{view.name}}</li>
      </ul>
    </div>
  </top-menu>
</template>

<script>
import { mapState } from 'vuex'


export default {
  computed: {
    ...mapState(['views', 'focuseViewType']),
  }
}
</script>

<style lang="postcss" scoped>
.scroll-bar {
  overflow-x: auto;
  overflow-y: hidden;
}

.navigator {
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 120px;
  white-space:nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  & .item {
    position: relative;
    display: inline-block;
    list-style: none;
    padding: 0 10px;
    cursor: pointer;

    &::before {
      content: ' ';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 12px;
      width: 100%;
      background: #333;
      transform: scaleX(0);
      transition: transform .2s ease-in;
    }

    &.active::before {
      transform: scaleX(1);
    }
  }
}
</style>
