<!-- <template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template> -->

<template>
  <q-layout view="hHh lpR fFf">
    <MQTT></MQTT>
    <MqttStatus />
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="toolbar">
          <div class="row items-center no-wrap">
            <div class="col-auto">
              <div class="app-logo">SPOTTY</div>
              <div class="app-tagline gt-xs">
                Live spots from PSKReporter
              </div>
            </div>
            <q-space />
            <div class="col-auto">
              <div class="row q-gutter-xs items-center">
                <q-chip
                  v-if="store.global_mode"
                  icon="public"
                  color="deep-orange"
                  text-color="white"
                  size="sm"
                  class="station-chip q-ma-none"
                >
                  Global
                </q-chip>
                <template v-else>
                  <q-chip
                    v-if="store.callsign"
                    icon="radio"
                    color="secondary"
                    text-color="white"
                    size="sm"
                    class="station-chip q-ma-none"
                  >
                    {{ store.callsign }}
                  </q-chip>
                  <q-chip
                    v-if="store.grid"
                    icon="grid_on"
                    color="secondary"
                    text-color="white"
                    size="sm"
                    class="station-chip q-ma-none"
                  >
                    {{ store.grid }}
                  </q-chip>
                </template>
                <q-btn
                  flat
                  round
                  :icon="store.dark_mode ? 'light_mode' : 'dark_mode'"
                  @click="toggleDarkMode"
                  class="q-ml-sm"
                  size="sm"
                >
                  <q-tooltip>
                    {{
                      store.dark_mode
                        ? "Switch to Light Mode"
                        : "Switch to Dark Mode"
                    }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>

      <!-- Desktop Navigation -->
      <q-tabs align="left" class="gt-sm">
        <q-route-tab to="/settings" icon="settings" label="Settings" />
        <q-route-tab to="/map" icon="map" label="Map" />
        <q-route-tab to="/log" icon="list_alt" label="Log" />
        <q-route-tab to="/status" icon="analytics" label="Status" />
        <q-route-tab to="/help" icon="help" label="Help" />
        <q-route-tab to="/credits" icon="info" label="Credits" />
      </q-tabs>

      <!-- Mobile Navigation -->
      <q-tabs align="justify" class="lt-md">
        <q-route-tab to="/settings" icon="settings" />
        <q-route-tab to="/map" icon="map" />
        <q-route-tab to="/log" icon="list_alt" />
        <q-route-tab to="/status" icon="analytics" />
        <q-route-tab to="/help" icon="help" />
        <q-route-tab to="/credits" icon="info" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar class="q-py-xs">
        <q-toolbar-title>
          <div class="row items-center justify-between">
            <div class="latency-meter">
              <q-icon name="schedule" size="xs" />
              <span class="latency-label">
                Avg Latency ({{ store.latency_window_minutes }}min):
              </span>
              <span class="latency-value" :class="latencyColor">
                {{ latencyDisplay }}
              </span>
            </div>
            <div class="spot-counter gt-xs">
              <q-icon name="public" size="xs" v-if="store.global_mode" />
              <q-icon name="radio" size="xs" v-else />
              <span class="spot-counter-value">
                {{ store.global_mode ? store.globalSpotCount : store.spotCount }}
              </span>
              <span class="spot-counter-label">{{ store.global_mode ? 'global spots' : 'spots' }}</span>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { computed, watch } from "vue";
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import MQTT from "src/components/MQTT.vue";
import MqttStatus from "src/components/MqttStatus.vue";

export default defineComponent({
  setup() {
    const store = useSettingsStore();
    const $q = useQuasar();
    const count = computed(() => store.topic);

    const latencyColor = computed(() => {
      const latency = store.averageLatency;
      if (latency === null) return "text-grey";
      if (latency < 30) return "text-green";
      if (latency < 60) return "text-yellow";
      return "text-red";
    });

    const latencyDisplay = computed(() => {
      const latency = store.averageLatency;
      if (latency === null) {
        return "N/A";
      }
      return `${latency}s`;
    });

    // Watch for dark mode changes and apply to Quasar
    watch(
      () => store.dark_mode,
      (newValue) => {
        $q.dark.set(newValue);
      },
      { immediate: true },
    );

    const toggleDarkMode = () => {
      store.dark_mode = !store.dark_mode;
    };

    return {
      store,
      latencyColor,
      latencyDisplay,
      toggleDarkMode,
    };
  },
  components: {
    MQTT,
    MqttStatus,
  },
});
</script>

<style scoped>
/* ============================================
   HEADER - COMMAND CENTER CONTROL PANEL
   ============================================ */
.q-header {
  background: linear-gradient(180deg, var(--color-panel) 0%, var(--color-void) 100%);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  min-height: 120px;
  position: relative;
}

/* Scan-line effect overlay */
.q-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  pointer-events: none;
  opacity: 0.3;
}

.body--dark .q-header {
  background: linear-gradient(180deg, var(--color-panel) 0%, var(--color-void) 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

.toolbar {
  font-size: 1rem;
  font-family: var(--font-body);
}

/* Logo Treatment - Retro-Future Style */
.app-logo {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: 0.1em;
  background: linear-gradient(135deg, #1976d2 0%, #26a69a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse-glow 3s ease-in-out infinite;
}

.body--dark .app-logo {
  background: linear-gradient(135deg, var(--color-signal-strong) 0%, #00d9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
}

.app-tagline {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-primary);
  opacity: 0.8;
  letter-spacing: 0.05em;
  margin-top: 4px;
}

.body--dark .app-tagline {
  color: var(--text-primary);
  opacity: 0.7;
}

/* Callsign/Grid Chips - Equipment Display Style */
.station-chip {
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 0.05em;
  border: 1px solid #1976d2;
  box-shadow: inset 0 0 10px rgba(25, 118, 210, 0.1),
              0 0 10px rgba(25, 118, 210, 0.2);
  transition: all 0.3s ease;
}

.station-chip:hover {
  box-shadow: inset 0 0 15px rgba(25, 118, 210, 0.2),
              0 0 15px rgba(25, 118, 210, 0.4);
  transform: translateY(-1px);
}

.body--dark .station-chip {
  border: 1px solid var(--color-signal-strong);
  box-shadow: inset 0 0 10px rgba(0, 255, 136, 0.1),
              0 0 10px rgba(0, 255, 136, 0.2);
}

/* Navigation Tabs - Frequency Dial Style */
.q-tabs {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.q-tab {
  font-family: var(--font-body);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  transition: all 0.2s ease;
  color: var(--text-secondary);
}

.q-tab--active {
  color: #1976d2;
  position: relative;
}

.body--dark .q-tab--active {
  color: var(--color-signal-strong);
}

.q-tab--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: #1976d2;
  box-shadow: 0 0 10px #1976d2;
  animation: tab-glow 2s ease-in-out infinite;
}

.body--dark .q-tab--active::after {
  background: var(--color-signal-strong);
  box-shadow: 0 0 10px var(--color-signal-strong);
}

/* ============================================
   FOOTER - STATUS BAR REDESIGN
   ============================================ */
.q-footer {
  background: var(--color-panel);
  border-top: 2px solid var(--color-border);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  position: relative;
}

.body--dark .q-footer {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
}

/* VU Meter Style Latency Display */
.latency-meter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
}

.body--dark .latency-meter {
  background: rgba(0, 0, 0, 0.3);
}

.latency-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.latency-value {
  font-weight: 700;
  font-size: 1rem;
  min-width: 45px;
  text-align: right;
  transition: all 0.3s ease;
}

.latency-value.text-green {
  color: var(--color-signal-strong);
  text-shadow: 0 0 10px var(--color-signal-strong);
}

.latency-value.text-yellow {
  color: var(--color-signal-medium);
  text-shadow: 0 0 10px var(--color-signal-medium);
}

.latency-value.text-red {
  color: var(--color-signal-weak);
  text-shadow: 0 0 10px var(--color-signal-weak);
  animation: alert-pulse 1s ease-in-out infinite;
}

.latency-value.text-grey {
  color: #9e9e9e;
  text-shadow: none;
}

.body--dark .latency-value.text-grey {
  color: var(--text-tertiary);
}

/* Spot Counter with LED Style */
.spot-counter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(25, 118, 210, 0.05);
  border-radius: 4px;
  border: 1px solid rgba(25, 118, 210, 0.2);
  font-family: var(--font-mono);
}

.body--dark .spot-counter {
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.spot-counter-value {
  font-weight: 700;
  color: #1976d2;
  min-width: 30px;
  text-align: right;
  font-size: 1rem;
}

.body--dark .spot-counter-value {
  color: var(--color-signal-strong);
}

.spot-counter-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 599px) {
  .app-logo {
    font-size: 1.5rem;
  }

  .station-chip {
    font-size: 0.7rem;
    padding: 6px 12px;
  }

  .latency-meter {
    padding: 3px 8px;
    gap: 6px;
  }

  .latency-label {
    display: none;
  }

  .latency-value {
    font-size: 0.9rem;
    min-width: 35px;
  }

  .q-footer {
    font-size: 0.7rem;
  }
}

/* Responsive spacing */
.q-toolbar-title .row {
  width: 100%;
}

/* Status indicators */
.text-green {
  color: var(--color-signal-strong) !important;
}
.text-yellow {
  color: var(--color-signal-medium) !important;
}
.text-red {
  color: var(--color-signal-weak) !important;
}
.text-grey {
  color: #9e9e9e !important;
}

.body--dark .text-grey {
  color: var(--text-tertiary) !important;
}
</style>
