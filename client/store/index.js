import env from 'detect-env'
import { createThing } from '../modules/thing'
import { createThingType } from '../modules/thingType'
import { saveThings, getThings } from '../modules/storage';
import 'expose-loader?vuex!vuex'
// import 'vuex'
// import dataActions from './actions/data'
// import interfaceActions from './actions/data'
// import loadActions from './actions/load'
import dataModule from './data'
import interfaceModule from './interface'
import hooksModule from './hooks'
import pluginModule from './plugin'
import statusModule from './status'


export default {
  strict: env.is.prod ? false : true,

  modules: {
    data: dataModule,
    hooks: hooksModule,
    interface: interfaceModule,
    plugin: pluginModule,
    status: statusModule,
  },

  state: {},

  actions: {
    'system.init': async ({ getters, commit, dispatch }) => {
      if (getters.applicationStatus !== 'initization') return;

      await dispatch('system.application.load.before')

      await dispatch('system.data.user.load')
      await dispatch('system.plugin.load', 'assist-plugin-system')
      await dispatch('system.data.things.load')

      await dispatch('system.application.load.after')
    },
  },
};
