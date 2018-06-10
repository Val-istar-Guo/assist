import jsonp from '../modules/jsonp'
import { createThingType } from '../modules/thingType'


const objectify = array => array
  .reduce((o, item) => {
    o[item.name] = item
    return o
  }, {})

export default {
  state: {
    detials: [],
    views: {},
    thingTypes: {},
    styles: {},
  },
  getters: {
    views: state => Object.entries(state.views).map(pair => pair[1]),
    thingTypes: state => Object.entries(state.thingTypes).map(pair => pair[1]),

    getThingTypeByName: state => name => state.thingTypes[name],
    getViewByName: state => name => state.views[name],
    getPluginDetialByName: state => name => state.detials.find(item => item.name === name),

    includeView: state => name => name in state.views,
    includeThingType: state => name => name in state.thingTypes,
  },
  actions: {
    'system.plugin.load': async ({ state, commit }, plugin) => {
      console.log('load plugin')
      const includePlugin = name => state.detials.some(item => item.name === name)

      if (typeof plugin === 'string') {
        if (includePlugin(plugin)) return
        const pluginName = plugin
        plugin = await jsonp(`/api/plugin/${pluginName}`)
        plugin.name === pluginName
      } else if (includePlugin(plugin.name)) return

      // OPTIMIZE: plugin 消毒 name, icon...

      commit('plugin.load', plugin)

      if (plugin.thingTypes.length) commit('plugin.thingTypes.load', plugin.thingTypes)
      if (plugin.views.length) commit('plugin.views.load', plugin.views)
      if (plugin.styles.length) commit('plugin.styles.load', plugin.styles)
    },
  },
  mutations: {
    'plugin.load': (state, plugin) => {
      const { name, displayName, version, icon, views, styles, thingTypes } = plugin

      const detial = {
        name,
        displayName,
        icon,
        version,
        views: views.map(item => item.name),
        styles: styles.map(item => item.name),
        thingTypes: thingTypes.map(item => item.name),
      }

      state.detials = [...state.detials, detial]
    },

    'plugin.thingTypes.load': (state, thingTypes) => {
      thingTypes = thingTypes.map(createThingType)
      state.thingTypes = { ...state.thingTypes, ...objectify(thingTypes) }
    },
    'plugin.views.load': (state, views) => {
      state.views = { ...state.views, ...objectify(views) }
    },
    'plugin.styles.load': (state, styles) => {
      state.styles = { ...state.styles, ...objectify(styles) }
    },
  },
}
