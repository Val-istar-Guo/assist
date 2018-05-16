<template lang="html">
  <div class="container">
    <ul class="navigator">
      <li v-for="view in views":class="[view.type === focuseViewType ? 'active' : '', 'item']">{{view.name}}</li>
    </ul>
  </div>
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
.container {
  width: 100%;
  height: 50px;
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.2)
}

.navigator {
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 50px;

  & .item {
    position: relative;
    display: inline-block;
    list-style: none;
    padding: 0 20px;
    cursor: pointer;

    &::before {
      content: ' ';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
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
