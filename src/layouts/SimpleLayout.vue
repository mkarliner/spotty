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
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="toolbar">
          <div class="row items-center no-wrap">
            <div class="col-auto">
              <div class="text-h5 text-weight-bold">SPOTTY</div>
              <div class="text-caption text-grey-3 gt-xs">
                Live spots from PSKReporter
              </div>
            </div>
            <q-space />
            <div class="col-auto">
              <div class="row q-gutter-xs items-center">
                <q-chip
                  v-if="store.callsign"
                  icon="radio"
                  color="secondary"
                  text-color="white"
                  size="sm"
                  class="q-ma-none"
                >
                  {{ store.callsign }}
                </q-chip>
                <q-chip
                  v-if="store.grid"
                  icon="grid_on"
                  color="accent"
                  text-color="white"
                  size="sm"
                  class="q-ma-none"
                >
                  {{ store.grid }}
                </q-chip>
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
            <div class="footer-info">
              <q-icon name="schedule" size="xs" class="q-mr-xs" />
              <span class="text-caption">
                Latency:
                <span :class="latencyColor">
                  {{ Math.round((Date.now() - store.last_spot) / 1000) }}s
                </span>
              </span>
            </div>
            <div class="footer-stats gt-xs">
              <q-icon name="radio" size="xs" class="q-mr-xs" />
              <span class="text-caption">
                {{ Object.keys(store.report_points || {}).length }} spots
              </span>
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

export default defineComponent({
  setup() {
    const store = useSettingsStore();
    const $q = useQuasar();
    const count = computed(() => store.topic);

    const latencyColor = computed(() => {
      const latency = Math.round((Date.now() - store.last_spot) / 1000);
      if (latency < 30) return "text-green";
      if (latency < 60) return "text-yellow";
      return "text-red";
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
      toggleDarkMode,
    };
  },
  components: {
    MQTT,
  },
});
</script>

<style scoped>
.toolbar {
  font-size: 1rem;
}

.footer-info,
.footer-stats {
  display: flex;
  align-items: center;
}

/* Mobile optimizations */
@media (max-width: 599px) {
  .toolbar .text-h5 {
    font-size: 1.2rem;
  }

  .q-chip {
    font-size: 0.7rem;
  }
}

/* Responsive spacing */
.q-toolbar-title .row {
  width: 100%;
}

/* Better visual hierarchy */
.text-caption {
  opacity: 0.9;
}

/* Status indicators */
.text-green {
  color: #4caf50 !important;
}
.text-yellow {
  color: #ff9800 !important;
}
.text-red {
  color: #f44336 !important;
}
</style>
