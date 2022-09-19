import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({

      topic: "pskr/filter/+/+/+/+/IO91/#"
  }),

  getters: {
    getTopic (state) {
      return state.topic
    }
  },

  actions: {
      setTopic(topic) {
        this.topic = topic
      }
  }
})
