import request from 'superagent'
import { createThing } from '../modules/thing'
import { saveThings, getThings } from '../modules/storage';


export default {
  state: {
    user: {
      id: '',
      name: '',
    },

    setting: {
      autoSync: false,
    },

    things: [],
  },
  getters: {
    things: state => state.things,
    setting: state => state.setting,
    user: state => state.user,
    getThingById: state => id => state.things.find(item => item.id === id),
    getThingByUUID: state => uuid => state.things.find(item => item.uuid === uuid),
  },
  actions: {
    'system.data.user.load': async ({ state, commit }) => {
      // const user = await request
      //   .get('/api/user')
      //   .query('id', 'id')

      commit('user.load', { id: '10000', name: 'Val-istar-Guo' })
    },

    'system.data.things.load': async ({ getters, commit, dispatch }) => {
      let things = await getThings()

      console.log(getters)
      const { getThingTypeByName } = getters

      things = things
        .map(thing => {
          // OPTIMIZE: thingType不存在的情况
          const thingType = getThingTypeByName(thing.type)
          if (thingType) return createThing(thing, thingType)

          return null;
        })
        .filter(item => !!item)

      console.log('system.thing.load.before: ', things)
      things = await dispatch('system.things.load', things)
      commit('things.append', things)
    },

    'system.data.things.append': async ({ state, commit, getters, dispatch }, fieldGroups) => {
      console.log('system append things: ', fieldGroups)
      const { getThingTypeByName } = getters

      let things = fieldGroups.map(fields => {
        const thingType = getThingTypeByName(fields.type)
        let thing = createThing({}, thingType)
        return thingType.modifyThing(thing, fields, getters)
      })

      things = await dispatch('system.things.create', things)

      commit('things.append', things)
      dispatch('system.data.things.storage')
    },
    'system.data.things.delete': async ({ state, commit, dispatch }, thing) => {
      console.log('system delete thing')

      thing.hooks.beforeDelete(thing)
      commit('thing.delete', [thing])
      dispatch('system.storage')
    },
    'system.data.things.modify': async ({ state, commit, getters, dispatch }, fieldGroups) => {
      console.log('system modify thing', fieldGroups)
      const { getThingById, getThingTypeByName } = getters


      let things = fieldGroups
        .map(fields => {
          let thing = getThingById(fields.id)
          console.log(fields, thing)
          const thingType = getThingTypeByName(thing.type)
          return thingType.modifyThing(thing, fields, getters)
        })

      things = await dispatch('system.things.modify', things)
      commit('things.modify', things)
      dispatch('system.data.things.storage')
    },

    'system.data.things.storage': async ({ state, commit }) => {
      /* 不存储 thing.hook 与 thing.fields 属性，因为这是根据插件动态生成的，非数据 */
      const things = state.things
        .map(thing => ({
          type: thing.type,
          state: thing.state,
          time: thing.time,
          children: thing.children,
          nesting: thing.nesting,
          id: thing.id,
          uuid: thing.uuid,
          title: thing.title,
          note: thing.note,
          tags: thing.tags,
          important: thing.important,
          extends: thing.extends,
          extendsCache: thing.extendsCache,
        }))

      console.log('system storage data: ', things)

      saveThings(things);
    },

    'system.data.setting.modify': async ({ state, commit }, setting) => {
      commit('setting.modify', setting)
    },
  },
  mutations: {
    'user.load': (state, user) => {
      state.user = user
      // TODO: load user setting
    },
    'setting.load': (state, setting) => {
    },
    'setting.modify': (state, setting) => {
      state.setting = { ...state.setting, ...setting }
    },

    'things.append': (state, things) => {
      state.things = [...state.things, ...things]
      return state;
    },
    'things.modify': (state, things) => {
      state.things = things
    },
    'setting.load': (state, things) => {
    },
    'things.delete': (state, things) => {
    },
  }
}
