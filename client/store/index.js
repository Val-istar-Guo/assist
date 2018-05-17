import env from 'detect-env'
import request from 'superagent'
import uuid from 'uuid/v1'
import jsonp from '../modules/jsonp'
// import * as systemPlugin from '../modules/systemPlugin'
import { createThing } from '../modules/thing'


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
    focuseView: state => state.views.find(v => v.type === state.focuseViewType),
  },

  actions: {
    'system.init': async ({ state, commit, dispatch }) => {
      await dispatch('system.loadUser')
      await dispatch('system.loadPlugin', 'assist-plugin-system')
      await dispatch('system.loadThings', [])

      await dispatch('system.appendThing', {
        type: 'system.normal',
        title: '第一条测试任务',
        description: '这条任务用于测试，预示着异步插件载入成功',
      })

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
    'system.loadThings': async ({ state, commit }, things) => {
      const { thingTypes } = state

      things = things.map(thing => {
        // BUG: thingType不存在的情况
        const thingType = thingTypes.find(t => t.type === thing.type)
        return createThing(thing, thingType)
      })

      things.forEach(thing => thing)
    },
    'system.appendThing': async ({ state, commit }, thing) => {
      console.log('system append thing')

      const thingType = state.thingTypes.find(t => t.type === thing.type)

      thing = createThing(thing, thingType)

      thing = thing.hooks.onChange(thing)
      commit('thingsAppend', [thing])
    },
    'system.deleteThing': async ({ state, commit }, thing) => {
      console.log('system delete thing')

      thing.hooks.beforeDelete(thing)
      commit('thingsDelete', [thing])
    },
    'system.modifyThing': async ({ state, commit, getters }, { uuid, name, value }) => {
      console.log('system modify thing')

      state.things = state.things.map(item => {
        if (item.uuid !== thing.uuid) return item

        const editor = item.editor.find(e => e.name === name)
        const thing = editor.onChange(value, thing, getters)

        return thing.hooks.onChange(thing)
      })

      return state
    },

    'system.storage': async ({ state, commit }) => {
      console.log('system storage data')

      const { things } = state
      /* 不存储 thing.hook 与 thing.editor 属性，因为这是根据插件动态生成的，非数据 */
    },
  },

  mutations: {
    userLoaded: (state, user) => {
      state.user = user
      return state
    },
    pluginLoaded: (state, plugin) => {
      state.plugins = [...state.plugins, plugin.name]

      if ('style' in plugin) state.styles = [...state.styles, plugin.style]
      if ('thingTypes' in plugin) state.thingTypes = [...state.thingTypes, ...plugin.thingTypes]
      if ('views' in plugin) state.views = [...state.views, ...plugin.views]


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

    thingsDelete: (state, things) => {
    },

    afterApplicationLoaded: (state, thing) => {
      // 自动聚焦第一个view
      if (state.views.length && !state.focuseViewType) state.focuseViewType = state.views[0].type
      state.applicationStatus = 'running'
    },
  },
};
