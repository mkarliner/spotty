<template>
  <div class="map-wrapper">
    <!-- Empty state overlay -->
    <div v-if="showEmptyState" class="empty-state-overlay">
      <EmptyState
        icon="satellite_alt"
        iconColor="primary"
        :title="emptyStateTitle"
        :message="emptyStateMessage"
      >
        <template #action>
          <q-btn
            v-if="store.mqtt_status === 'disconnected' || store.mqtt_status === 'error'"
            color="primary"
            label="Check Settings"
            to="/settings"
            icon="settings"
          />
        </template>
      </EmptyState>
    </div>

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
              :topicKey="p.topicKey"
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
              :topicKey="p.topicKey"
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
import { computed, ref, provide } from "vue";
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
import proj4 from "proj4";
const mqttHook = useMQTT();
import ReportPoint from "src/components/ReportPoint.vue";
import EmptyState from "src/components/EmptyState.vue";
import VueScreenSizeMixin from "vue-screen-size";
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
      const lightColors = {
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

      const darkColors = {
        "160m": "#ff6b6b",
        "80m": "#f06292",
        "60m": "#5c6bc0",
        "40m": "#42a5f5",
        "30m": "#66bb6a",
        "20m": "#ffb74d",
        "17m": "#fff176",
        "15m": "#d4b896",
        "12m": "#e57373",
        "10m": "#f48fb1",
        "6m": "#ff5722",
        "2m": "#ba68c8",
      };

      const isDark = store.dark_mode;
      const colors = isDark ? darkColors : lightColors;
      return colors[band] || (isDark ? "#bdbdbd" : "#808080");
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

    // Empty state logic
    const spotCount = computed(() => Object.keys(store.report_points || {}).length);

    const showEmptyState = computed(() => {
      // Show empty state if connected but no spots after 10 seconds
      if (store.mqtt_status === 'connected' && spotCount.value === 0) {
        const timeSinceLastSpot = (Date.now() - store.last_spot) / 1000;
        return timeSinceLastSpot > 10;
      }
      // Show if not connected
      return store.mqtt_status === 'disconnected' || store.mqtt_status === 'error';
    });

    const emptyStateTitle = computed(() => {
      if (store.mqtt_status === 'disconnected') {
        return 'Not Connected';
      } else if (store.mqtt_status === 'error') {
        return 'Connection Error';
      } else if (store.mqtt_status === 'connecting') {
        return 'Connecting...';
      } else if (spotCount.value === 0) {
        return 'No Spots Yet';
      }
      return 'No Data';
    });

    const emptyStateMessage = computed(() => {
      if (store.mqtt_status === 'disconnected') {
        return 'MQTT connection is not established. Check your settings and network connection.';
      } else if (store.mqtt_status === 'error') {
        return store.mqtt_error || 'Unable to connect to MQTT broker. Please check your settings.';
      } else if (store.mqtt_status === 'connecting') {
        return 'Establishing connection to MQTT broker...';
      } else if (!store.track_callsign && !store.track_grid) {
        return 'Enable callsign or grid tracking in Settings to see spots on the map.';
      } else if (spotCount.value === 0) {
        return `Waiting for signal reports matching ${store.track_callsign ? store.callsign : ''}${store.track_callsign && store.track_grid ? ' and ' : ''}${store.track_grid ? store.grid : ''}. This may take a few moments.`;
      }
      return 'No spots available to display.';
    });

    return {
      store,
      showEmptyState,
      emptyStateTitle,
      emptyStateMessage,
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
      this.store.deletePoint(payload);
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
      // Calculate distance between two grid squares using haversine formula
      try {
        const [lat1, lon1] = locatorToLatLng(grid1);
        const [lat2, lon2] = locatorToLatLng(grid2);

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
        console.error("Error calculating distance:", e);
        return null;
      }
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
    EmptyState,
  },
};
</script>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: calc(100vh - 120px - 90px); /* Subtract header (120px) and footer (~90px) */
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.map-container {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
}

.empty-state-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.body--dark .empty-state-overlay {
  background: rgba(30, 30, 30, 0.95);
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

.body--dark .controls-card {
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
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

.body--dark .spot-popup {
  background: #2d2d2d;
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.body--dark .popup-header {
  background: #404040;
  border-bottom: 1px solid #555;
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
  .map-wrapper {
    height: calc(100vh - 140px - 90px); /* Mobile header is taller */
  }

  .map-container {
    height: calc(100vh - 140px - 90px); /* Mobile header is taller */
  }

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
