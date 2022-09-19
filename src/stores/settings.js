import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({

      topic: "pskr/filter/+/+/+/+/IO91/#",
      report_points: {}
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
