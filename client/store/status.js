const applicationStatus = ['initization', 'running', 'closing']
const dataSyncStatus = ['sleeping', 'running']
export default {
  state: {
    application: applicationStatus[0],
    dataSync: dataSyncStatus[0],
  },
  getters: {
    applicationStatus: state => state.application,
    dataSyncStatus: state => state.dataSync,
  },
  actions: {
    'system.application.load.after': ({ commit }) => {
      commit('status.application.forward', 'running')
    },
    'system.data.sync.before': ({ commit }) => {
      commit('status.dataSync.change', 'running')
    },
    'system.data.sync.after': ({ commit }) => {
      commit('status.dataSync.change', 'sleeping')
    },
  },
  mutations: {
    'status.application.forward': (state, next) => {
      const indexOfNext = applicationStatus.findIndex(item => item === next)
      const indexOfCurrent = applicationStatus.findIndex(item => item === state.application)

      if (indexOfNext && indexOfNext > indexOfCurrent) state.application = next
    },
    'status.dataSync.change': (state, next) => {
      if (!dataSyncStatus.includes(next) || state.dataSync === next) return

      state.dataSync = next
    },
  }
}
