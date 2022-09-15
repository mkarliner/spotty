import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    topic: 0
  }),

  getters: {
    getTopic (state) {
      return state.topic
    }
  },

  actions: {

  }
})
