import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({

      topic: "adfsf",
      report_points: {},
      report_ttl: 60,
      callsign: "MY8CALL",
      grid: "AA91",
      mode: "grid"
  }),

  getters: {
    getTopic (state) {
      return state.topic
    },

    getReportPoints (state) {
      console.log(      "sss")
      return state.report_points
    }
  },

  actions: {
      setGrid(grid) {
        this.grid = grid

      },

      setTopic(topic) {
        this.topic = topic
      }
  }
})
