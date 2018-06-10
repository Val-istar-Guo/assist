const createThingComponentInitialData = {
  type: null,
  active: false,
  fields: [],
  values: {},
}

export default {
  state: {
    createThingComponent: createThingComponentInitialData,
    focuseViewName: null,
  },
  getters: {
    focusView: (state, getters) => {
      return getters.getViewByName(state.focuseViewName)
    },
  },
  actions: {
    'system.interface.createThing': ({ getters, commit }, typeName) => {
      const { thingTypes, getThingTypeByName } = getters

      // NOTE: 无任何事务类型则创建空页面，页面提示错误
      if (!thingTypes.length) return commit('interface.createThingComponent.active')

      let thingType = null

      if (typeName) {
        thingType = getThingTypeByName(typeName)
        if (!thingType) thingType = thingTypes[0]
      }

      return commit('interface.createThingComponent.active', thingType)
    },

    'system.interface.warn': () => {
    },
    'system.interface.focusView': ({ state, getters, commit }, name) => {
      if (getters.includeView(name)) commit('interface.view.focus', name)
    },

    'system.application.load.after': ({ getters, commit }) => {
      if (getters.views.length) commit('interface.view.focus', getters.views[0].name)
    },
  },
  mutations: {
    'interface.createThingComponent.active': (state, thingType) => {
      state.createThingComponent = createThingComponentInitialData
      state.createThingComponent.active = true

      if (!thingType) return

      const fields = thingType.fields
        .filter(field => field.required)

      const values = fields
        .reduce((o, field) => {
          o[field.name]  = field.defaulted
          return o;
        }, {});

      state.type = thingType.name
      state.createThingComponent.fields = fields
      state.createThingComponent.values = values
    },
    'interface.createThingComponent.type.modify': (state, type) => {
      state.type = type
    },
    'interface.createThingComponent.fields.modify': (state, fields) => {
      Object.entries(fields)
        .forEach(([name, value]) => {
          state.values[name] = value
        })
    },
    'interface.createThingComponent.fields.clear': (state, fields) => {
      fields
        // OPTIMIZE: if cannot find field
        .map(field => state.fields.find(item => item.name === field))
        .filter(field => !!field)
        .forEach(field => {
          state.values[field.name] = field.defaulted
        })
    },
    'interface.createThingComponent.hide': (state, fields) => {
      state.createThingComponent.active = false;
    },

    'interface.view.focus': (state, viewName) => {
      state.focuseViewName = viewName
    },
  },
}
