import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    topic: "adfsf",
    report_points: {},
    report_ttl: 60,
    callsign: "MY8CALL",
    grid: "AA91",
    mode: "grid",
    last_spot: Date.now(),
    track_callsign: true,
    track_grid: true,
    show_snr: false,
    show_grid: true
  }),

  persist: {
    afterRestore: (ctx) => {
      ctx.store.$state.report_points = {};
      console.log("REST: ", ctx.store.$state);
    },
  },

  getters: {
    getTopic(state) {
      return state.topic;
    },

    getReportPoints(state) {
      console.log("sss");
      return state.report_points;
    },
  },

  actions: {
    deletePoint(seq) {
      //console.log("DETE: ", seq)
      delete this.report_points[seq.toString()];
    },

    setTopic(topic) {
      this.topic = topic;
    },
  },
});
