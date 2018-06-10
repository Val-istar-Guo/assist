const thingEvents = ['create', 'load', 'modify', 'delete']

const events = [
  'beforeApplicationLoad', 'afterApplicationLoaded',
  'thingCreate', 'thingLoad', 'thingModify', 'thingDelete',
]

const includeEvent = object => event =>
  object.hooks && typeof object.hooks[event] === 'function'

export default {
  state: {
    ...events.reduce((o, event) => {
      o[event] = []
      return o
    }, {}),

    thingTypeHooks: {
      'system.list': {},
      'system.pomodoro': {},
    },
  },
  actions: {
    'system.application.load.before': ({ state, dispatch }) => {
      dispatch('system.interface.focuseView')
    },
    'system.application.load.after': ({ state }) => {
    },
    'system.application.load.before': ({ state }) => {

    },
    'system.things.load': ({ state }, things) => {
      console.log('hooks system.things.load', things)

      return things.map(thing => {
        if (thing.type in state.thingTypeHooks) {
          const hooks = state.thingTypeHooks[thing.type]
          hooks.load.forEach(handle => {
            thing = handle(thing)
          })
        }

        state.thingLoad.forEach(handle => {
          thing = handle(thing)
        })

        return thing
      })
    },
    'system.things.create': ({ state }, things) => {
      return things.map(thing => {
        if (thing.type in state.thingTypeHooks) {
          const hooks = state.thingTypeHooks[thing.type]
          hooks.create.forEach(handle => {
            thing = handle(thing)
          })
        }

        state.thingCreate.forEach(handle => {
          thing = handle(thing)
        })

        return thing
      })
    },

    'system.things.delete': ({ state }) => {
    },
    'system.things.modify': ({ state }, things) => {
      return things.map(thing => {
        if (thing.type in state.thingTypeHooks) {
          const hooks = state.thingTypeHooks[thing.type]
          hooks.modify.forEach(handle => {
            thing = handle(thing)
          })
        }

        state.thingModify.forEach(handle => {
          thing = handle(thing)
        })

        return thing
      })
    },
  },
  mutations: {
    'thingTypes.load': (state, thingTypes) => {
      thingTypes.forEach(thingType => {
        const { name } = thingType

        thingEvents
          .filter(includeEvent(thingType))
          .forEach(event => {
            const events = thingType.hooks[event]
            state.thingTypeHooks[name][event] = [...state.thingTypeHooks[name][event], ...events]
          })
      })
    },
    'plugin.load': (state, plugin) => {
      console.log('plugin: ', plugin)
      events
        .filter(includeEvent(plugin))
        .map(event => {
          state[event] = [...state[evnet], plugin.hooks[event]]
        })
    },
  },
}
