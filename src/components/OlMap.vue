<template>
  <div>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      ref="view"
      class="map-container"
    >
      <div class="map-controls">
        <q-card class="controls-card">
          <q-card-section class="q-pa-md">
            <div class="text-subtitle2 q-mb-sm text-center">Map Controls</div>
            <div class="controls-container">
              <q-toggle
                v-model="store.show_grid"
                label="Show grid spots"
                size="md"
                color="primary"
                class="q-mb-sm"
                left-label
              />
              <q-toggle
                v-model="store.show_band_labels"
                label="Show band labels"
                size="md"
                color="secondary"
                left-label
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <ol-interaction-select @select="featureSelected">
        <ol-overlay :position="oposition">
          <div class="spot-popup" v-if="selectedSpot">
            <div class="popup-header">
              <div
                class="band-indicator"
                :style="{ backgroundColor: getBandColor(selectedSpot.band) }"
              >
                {{ selectedSpot.band }}
              </div>
              <q-btn
                flat
                round
                dense
                icon="close"
                size="sm"
                @click="closePopup"
                class="close-btn"
              />
            </div>

            <div class="popup-content">
              <div class="station-info">
                <div class="tx-station">
                  <q-icon name="radio" size="xs" />
                  <span class="label">TX:</span>
                  <span class="callsign">{{ selectedSpot.tcall }}</span>
                  <span class="grid">{{ selectedSpot.sgrid }}</span>
                </div>

                <div class="rx-station">
                  <q-icon name="hearing" size="xs" />
                  <span class="label">RX:</span>
                  <span class="callsign">{{ selectedSpot.rcall }}</span>
                  <span class="grid">{{ selectedSpot.rgrid }}</span>
                </div>
              </div>

              <div class="signal-info">
                <div class="snr-info">
                  <q-icon name="signal_cellular_alt" size="xs" />
                  <span class="label">SNR:</span>
                  <span class="value" :class="getSnrClass(selectedSpot.snr)">
                    {{ selectedSpot.snr }}dB
                  </span>
                </div>

                <div class="time-info">
                  <q-icon name="schedule" size="xs" />
                  <span class="label">Time:</span>
                  <span class="value">{{
                    formatTime(selectedSpot.timestamp)
                  }}</span>
                </div>
              </div>

              <div class="distance-info" v-if="selectedSpot.distance">
                <q-icon name="straighten" size="xs" />
                <span class="label">Distance:</span>
                <span class="value">{{ selectedSpot.distance }}km</span>
              </div>
            </div>
          </div>
        </ol-overlay>
      </ol-interaction-select>
      <ol-view
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
        showFullExtent
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature
            v-for="p in this.store.report_points"
            v-bind:key="p.sequenceNumber"
          >
            <report-point
              v-if="p.report.sc != this.store.callsign && this.store.show_grid"
              @delete="deleteRP"
              :sequenceNumber="p.sequenceNumber"
              :report="p.report"
              :topic="p.topic"
              :rx_coordinate="p.rx_coordinate"
              :tx_coordinate="p.tx_coordinate"
              :band="p.band"
              :callsign="p.report.sc"
              :owncallsign="this.store.callsign"
            ></report-point>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>

      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature
            v-for="p in this.store.report_points"
            v-bind:key="p.sequenceNumber"
          >
            <report-point
              v-if="
                p.report.sc == this.store.callsign ||
                p.report.rc == this.store.callsign
              "
              @delete="deleteRP"
              :sequenceNumber="p.sequenceNumber"
              :report="p.report"
              :topic="p.topic"
              :rx_coordinate="p.rx_coordinate"
              :tx_coordinate="p.tx_coordinate"
              :band="p.band"
              :callsign="p.report.sc"
              :owncallsign="this.store.callsign"
            ></report-point>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>

      <ol-attribution-control></ol-attribution-control>
    </ol-map>
  </div>
</template>

<script>
import { useMQTT } from "mqtt-vue-hook";
import { locatorToLatLng } from "qth-locator";
import { computed } from "vue";
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
import proj4 from "proj4";
const mqttHook = useMQTT();

import { ref, provide } from "vue";
import ReportPoint from "src/components/ReportPoint.vue";
import VueScreenSizeMixin from "vue-screen-size";
import { STATEMENT_TYPES } from "@babel/types";
// import ReportPoint from "./ReportPoint.vue";
// import OpenLayersMap from 'vue3-openlayers'
export default {
  // name: 'OlMap',
  mixins: [VueScreenSizeMixin],
  mounted() {},
  setup() {
    const center = ref(proj4("EPSG:3857", [0, 10]));
    const overlaydisplay = ref("display: block");
    const projection = ref("EPSG:3857");
    const zoom = ref(2);
    const rotation = ref(0);
    const radius = ref(5);
    const strokeWidth = ref(10);
    const strokeColor = ref("red");
    const fillColor = ref("white");
    const coordinate = ref([-0.224, 51.555]);
    const selectedSpot = ref(null);

    const store = useSettingsStore();

    // const topic = computed(() => store.topic);

    // const oposition = computed(() => {
    //   return null
    //     return proj4('EPSG:3857', [0, 0])
    //   })

    const oposition = ref(null);

    // p.rx_coordinate

    console.log("Map active");

    // Helper methods
    const getBandColor = (band) => {
      const colors = {
        "160m": "#8B0000",
        "80m": "#e54be0",
        "60m": "#0D0067",
        "40m": "#0066CC",
        "30m": "#00AA00",
        "20m": "#FF8800",
        "17m": "#FFDD00",
        "15m": "#CAA36A",
        "12m": "#B11A28",
        "10m": "#FF69B4",
        "6m": "#FD001D",
        "2m": "#9932CC",
      };
      return colors[band] || "#808080";
    };

    const getSnrClass = (snr) => {
      const snrValue = parseInt(snr);
      if (snrValue >= 10) return "snr-excellent";
      if (snrValue >= 0) return "snr-good";
      if (snrValue >= -10) return "snr-fair";
      return "snr-poor";
    };

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString();
    };

    const closePopup = () => {
      oposition.value = null;
      selectedSpot.value = null;
    };

    return {
      store,
      center,
      projection,
      zoom,
      rotation,
      radius,
      strokeWidth,
      strokeColor,
      fillColor,
      coordinate,
      overlaydisplay,
      oposition,
      selectedSpot,
      getBandColor,
      getSnrClass,
      formatTime,
      closePopup,
    };
  },
  data() {
    // let report_points = [{ center: [-0.224, 51.555] }];
    // let report_points = [];
    return {
      // report_points: reppoints,
      // report_points: [{ sequenceNumber: 1, coordinate: [-0.224, 51.555] }]
      //report_points: {},
    };
  },

  methods: {
    deleteRP(payload) {
      //console.log("Deletion", payload);
      delete this.report_points[payload];
    },

    rxc(rxp) {
      console.log("xxx", rxp);

      return proj4("EPSG:3857", rxp);
    },

    rxt(rxp) {
      //console.log(rxp)

      return proj4("EPSG:3857", rxp);
    },

    // overlaydisplay() {
    //     return {display: "block"}
    // },

    featureSelected(event) {
      if (event.selected[0]) {
        const reportPoint =
          this.store.report_points[event.selected[0].values_.seqno];
        if (reportPoint) {
          const rep = reportPoint.report;
          this.oposition = event.selected[0].values_.geometry.extent_;

          // Create enhanced spot data for popup
          this.selectedSpot = {
            tcall: rep.sc,
            rcall: rep.rc,
            sgrid: rep.sl,
            rgrid: rep.rl,
            band: rep.b,
            snr: rep.rp,
            timestamp: reportPoint.timestamp,
            distance: this.calculateDistance(rep.sl, rep.rl),
          };
        }
      } else {
        this.oposition = null;
        this.selectedSpot = null;
      }
    },

    calculateDistance(grid1, grid2) {
      // Simple distance calculation between two grid squares
      // This is a placeholder - you might want to use a proper distance calculation
      try {
        const [lat1, lon1] = this.gridToLatLon(grid1);
        const [lat2, lon2] = this.gridToLatLon(grid2);

        const R = 6371; // Earth's radius in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
      } catch (e) {
        return null;
      }
    },

    gridToLatLon(grid) {
      // Basic grid square to lat/lon conversion
      // This is simplified - you might want to use the qth-locator library
      if (!grid || grid.length < 4) return [0, 0];

      const A = grid.charCodeAt(0) - 65;
      const B = grid.charCodeAt(1) - 65;
      const C = parseInt(grid.charAt(2));
      const D = parseInt(grid.charAt(3));

      const lon = A * 20 + C * 2 - 180 + 1;
      const lat = B * 10 + D - 90 + 0.5;

      return [lat, lon];
    },
    // featuresSelected(e) {
    //   console.log("FS", e)
    // }
    // report_points() {
    //   console.log(".....sss")
    //   return [
    //     this.report_points
    //   ]
    //   }
  },
  components: {
    ReportPoint,
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.map-controls {
  position: absolute;
  top: 80px;
  right: 10px;
  z-index: 1000;
}

.controls-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.1);
  min-width: 180px;
}

.controls-container {
  display: flex;
  flex-direction: column;
}

.controls-container .q-toggle {
  margin-bottom: 8px;
}

.controls-container .q-toggle:last-child {
  margin-bottom: 0;
}

/* Enhanced popup styling */
.spot-popup {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  max-width: 320px;
  overflow: hidden;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.band-indicator {
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.75rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.close-btn {
  color: #666;
}

.popup-content {
  padding: 12px;
}

.station-info,
.signal-info {
  margin-bottom: 8px;
}

.tx-station,
.rx-station,
.snr-info,
.time-info,
.distance-info {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  font-size: 0.85rem;
}

.label {
  font-weight: 600;
  color: #555;
  min-width: 30px;
}

.callsign {
  font-weight: bold;
  color: #1976d2;
  font-family: monospace;
}

.grid {
  color: #666;
  font-family: monospace;
  font-size: 0.8rem;
}

.value {
  font-weight: 500;
}

/* SNR color coding */
.snr-excellent {
  color: #4caf50;
  font-weight: bold;
}
.snr-good {
  color: #8bc34a;
  font-weight: bold;
}
.snr-fair {
  color: #ff9800;
  font-weight: bold;
}
.snr-poor {
  color: #f44336;
  font-weight: bold;
}

/* Mobile optimizations */
@media (max-width: 599px) {
  .map-controls {
    top: 90px;
    right: 5px;
  }

  .controls-card {
    min-width: 160px;
  }

  .controls-card .q-card-section {
    padding: 10px;
  }

  .text-subtitle2 {
    font-size: 0.8rem;
  }

  .overlay-content {
    font-size: 0.75rem;
    padding: 6px 8px;
    min-width: 150px;
  }
}
</style>
