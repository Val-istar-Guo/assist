<template lang="html">
  <div>
    <ul class="list">
      <li class="thing" v-for="thing in things">
        <div class="title">{{thing.title}}</div>
        <div class="description">{{thing.description}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  initialData: async function ({ store, route }) {
  },
  computed: {
    ...mapGetters(['things'])
  },
}
</script>

<style lang="postcss" scoped>
.list {
  margin: 0;
  padding: 0;
}
.thing {
  list-style: none;
  border-bottom: 1px solid #eeeeee;
  padding: 8px 20px;
}

.title {
  font-size: 16px;
  color: #333333;
  padding: 5px 0;
}
.description {
  font-size: 14px;
  color: #999999;
  padding: 3px 0;
}

</style>
