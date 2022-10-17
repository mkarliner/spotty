import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({

      topic: "pskr/filter/v2/+/+/+/+/IO91/#",
      report_points: {},
      report_ttl: 60,
      callsign: "G8LKD",
      grid: "IO91"
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
      setTopic(topic) {
        this.topic = topic
      }
  }
})
