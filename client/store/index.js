import env from 'detect-env'
import request from 'superagent'
import uuid from 'uuid/v1'
import jsonp from '../modules/jsonp'
import { createThing } from '../modules/thing'
import { createThingType } from '../modules/thingType'
import { saveThings, getThings } from '../modules/storage';
import 'expose-loader?vuex!vuex'
// import 'vuex'


export default {
  strict: env.is.prod ? false : true,

  modules: {},

  state: {
    // initization, running, closing
    applicationStatus: 'initization',
    plugins: [],
    focuseViewType: '',
    views: [],
    styles: [],
    thingTypes: [],

    hooks: {
      beforeApplicationLoad: [],
      afterApplicationLoaded: [],
      onThingCreate: [],
      onThingLoad: [],
      onThingDelete: [],
      onThingChange: [],
    },

    user: {
      id: '',
      name: '',
    },
    things: [],
  },

  getters: {
    views: state => state.views,
    things: state => state.things,
    thingTypes: state => state.thingTypes,
    focuseView: state => state.views.find(v => v.type === state.focuseViewType),
  },

  actions: {
    'system.init': async ({ state, commit, dispatch }) => {
      await dispatch('system.loadUser')
      await dispatch('system.loadPlugin', 'assist-plugin-system')
      await dispatch('system.loadThings')
      // await dispatch('system.appendThing', {
      //   type: 'system.normal',
      //   title: '第一条测试任务',
      //   description: '这条任务用于测试，预示着异步插件载入成功',
      // })

      commit('afterApplicationLoaded')
    },
    'system.loadUser': async ({ state, commit }) => {
      // const user = await request
      //   .get('/api/user')
      //   .query('id', 'id')

      commit('userLoaded', { id: '10000', name: 'Val-istar-Guo' })
    },
    'system.loadPlugin': async ({ state, commit }, plugin) => {
      console.log('load plugin')

      if (typeof plugin === 'string') {
        if (state.plugins.includes(plugin)) return
        const pluginName = plugin
        plugin = await jsonp(`/api/plugin/${pluginName}`)
        plugin.name === pluginName
      } else if (state.plugins.includes(plugin.name)) return


      commit('pluginLoaded', plugin)
    },
    'system.loadThings': async ({ state, commit }) => {
      let things = await getThings()
      const { thingTypes } = state

      things = things.map(thing => {
        // BUG: thingType不存在的情况
        const thingType = thingTypes.find(t => t.type === thing.type)
        return createThing(thing, thingType)
      })

      commit('thingsAppend', things)
    },
    'system.appendThing': async ({ state, commit, getters, dispatch }, editorProps) => {
      console.log('system append thing: ', editorProps)

      const thingType = state.thingTypes.find(t => t.type === editorProps.type)
      let thing = createThing({}, thingType)

      Object.entries(editorProps)
        .forEach(([name, value]) => {
          console.log(name)
          const field = thing.fields.find(e => e.name === name)
          if (field) thing = field.onChange(value, thing, getters)
        })

      thing = thing.hooks.onCreate(thing)
      commit('thingsAppend', [thing])
      dispatch('system.storage')
    },
    'system.deleteThing': async ({ state, commit, dispatch }, thing) => {
      console.log('system delete thing')

      thing.hooks.beforeDelete(thing)
      commit('thingsDelete', [thing])
      dispatch('system.storage')
    },
    'system.modifyThings': async ({ state, commit, getters, dispatch }, props) => {
      console.log('system modify thing', props)

      const things = state.things
        .filter(thing => {
          const prop = props.find(prop => prop.uuid === thing.uuid)
          if (!prop) return false

          return thing.fields.some(e => e.name === prop.name)
        })
        .map(thing => {
          const { value, name } = props.find(prop => prop.uuid === thing.uuid)
          return thing.fields.find(e => e.name === name).onChange(value, thing)
        })

      commit('thingsModified', things)
      dispatch('system.storage')
    },

    'system.storage': async ({ state, commit }) => {
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
          description: thing.description,
          tags: thing.tags,
          important: thing.important,
          extends: thing.extends,
          extendsCache: thing.extendsCache,
        }))

      console.log('system storage data: ', things)

      saveThings(things);
    },
  },

  mutations: {
    userLoaded: (state, user) => {
      state.user = user
      return state
    },
    pluginLoaded: (state, plugin) => {
      state.plugins = [...state.plugins, plugin.name]

      if ('style' in plugin) {
        state.styles = [...state.styles, plugin.style]
      }

      if ('thingTypes' in plugin) {
        state.thingTypes = [...state.thingTypes, ...plugin.thingTypes.map(createThingType)]
      }

      if ('views' in plugin) {
        state.views = [...state.views, ...plugin.views]
      }

      state.hooks = Object.entries(state.hooks)
        .map(([name, hooks]) => {
          if (name in plugin) return [name, [...hooks, plugin[name]]]
          return [name, hooks]
        })
        .reduce((o, [key, value]) => ({ ...o, [key]: value }), {})

      return state
    },

    thingsAppend: (state, things) => {
      things.map(thing => thing.hooks.onLoad(thing))

      state.things = [...state.things, ...things]
      return state;
    },

    thingsModified: (state, things) => {
      state.things = state.things.map(item => {
        const thing = things.find(t => t.uuid === item.uuid)
        if (!thing) return item
        // const fields = item.fields.find(e => e.name === name)
        // const thing = fields.onChange(value, thing, getters)

        return thing.hooks.onChange(thing)
      })

      return state
    },

    thingsDelete: (state, things) => {
    },

    afterApplicationLoaded: (state, thing) => {
      // 自动聚焦第一个view
      if (state.views.length && !state.focuseViewType) state.focuseViewType = state.views[0].type
      state.applicationStatus = 'running'
    },
  },
};
