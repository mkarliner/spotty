import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    topic: "adfsf",
    report_points: {},
    report_ttl: 60,
    callsign: "MYCALL",
    grid: "IO91",
    mode: "grid",
    last_spot: Date.now(),
    track_callsign: true,
    track_grid: true,
    show_snr: false,
    show_grid: true,
    show_band_labels: false,
    dark_mode: false,
    mqtt_status: 'disconnected', // 'connecting', 'connected', 'disconnected', 'reconnecting', 'error'
    mqtt_error: null,
    show_mqtt_status_always: true, // Show status always (true) or only on failure (false)
    latency_window_minutes: 5, // Time window for average latency calculation (in minutes)
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

    averageLatency(state) {
      const now = Date.now();
      const windowMs = state.latency_window_minutes * 60 * 1000;
      const cutoffTime = now - windowMs;

      const recentSpots = Object.values(state.report_points).filter(
        (spot) => spot.timestamp >= cutoffTime && spot.latency !== undefined
      );

      if (recentSpots.length === 0) {
        return null;
      }

      const totalLatency = recentSpots.reduce(
        (sum, spot) => sum + spot.latency,
        0
      );
      return Math.round(totalLatency / recentSpots.length / 1000); // Convert to seconds
    },

    spotCount(state) {
      return Object.keys(state.report_points || {}).length;
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
