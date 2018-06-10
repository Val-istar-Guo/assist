<template>
  <div :class="['panel', active ? 'active' : '']">
    <close-button @click="hide" class="close" />
    <div v-if="!type" class="reminder">安装事务插件后才可以创建事务</div>
    <div v-if="type" class="form">
      <div v-for="field in fields" :key="field.name">
        <assist-input
          class="input"
          :type="field.type"
          :label="field.label"
          @change="modifyFields({ [field.name]: $event })"
          :value="values[field.name]"
        />
      </div>
      <assist-button @click="createThing">创建</assist-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'


export default {
  computed: {
    ...mapGetters(['things', 'thingTypes', 'getThingTypeByName']),
    ...mapState({
      active: state => state.interface.createThingComponent.active,
      type: state => state.interface.createThingComponent.type,
      fields: state => state.interface.createThingComponent.fields,
      values: state => state.interface.createThingComponent.values,
    }),
  },
  methods: {
    ...mapMutations({
      modifyFields: 'interface.createThingComponent.fields.modify',
      hide: 'interface.createThingComponent.hide',
    }),
    ...mapActions({
      appendThing: 'system.thing.append',
    }),

    createThing() {
      this.appendThing(this.fields)
      this.hide()
    },
  }
}
</script>
<style lang="postcss" scoped>
.reminder {
  margin-top: 20vh;
  font-size: 32px;
}

.panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;

  padding: 140px 0 0 0;
  text-align: center;
  background: #fff;

  opacity: 0;
  transform: translateY(100vh);
  transition: opacity .2s linear, transform .2s ease-in;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }

  & .close {
    position: absolute;
    top: 60px;
    right: 60px;
  }

  & .input {
    margin: 20px 0;
  }
}
</style>
