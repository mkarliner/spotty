<template>
  <q-page class="settings-page">
    <div class="q-pa-md settings-content">
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <!-- <q-input v-model="broker" label="Broker" /> -->

        <q-separator class="q-my-md" />
        <div class="text-h6 q-mb-md">Appearance</div>
        <q-checkbox v-model="store.dark_mode" label="Dark mode" />
        <q-checkbox
          v-model="store.show_mqtt_status_always"
          label="Always show connection status"
        >
          <q-tooltip>
            When enabled, shows MQTT connection status at all times.
            When disabled, only shows on connection issues.
          </q-tooltip>
        </q-checkbox>

        <q-separator class="q-my-md" />
        <div class="text-h6 q-mb-md">Tracking</div>
        <q-checkbox v-model="store.track_callsign" label="Track callsign" />
        <q-input
          label="Callsign"
          type="text"
          v-model="callsign"
          :rules="[validateCallsignRule]"
          hint="3-12 alphanumeric characters (e.g., W1ABC, G4XYZ)"
          lazy-rules
          @blur="callsign = normalizeCallsign(callsign)"
        />
        <q-checkbox v-model="store.track_grid" label="Track grid" />
        <q-input
          label="Grid"
          type="text"
          v-model="grid"
          :rules="[validateGridRule]"
          hint="4, 6, or 8 characters (e.g., IO91, IO91vl)"
          lazy-rules
          @blur="grid = normalizeGridSquare(grid)"
        />

        <!-- <q-form @keydown.enter.prevent="changeTopic">
          <q-input label="Topic" type="text" v-model="topic" />
        </q-form> -->
        <q-input
          v-model.number="store.report_ttl"
          label="Time to Live"
          type="number"
          style="max-width: 200px"
          hint="Seconds before spots are removed from map"
        />
        <q-input
          v-model.number="store.latency_window_minutes"
          label="Latency Window"
          type="number"
          style="max-width: 200px"
          hint="Minutes to average latency over (shown in footer)"
          :rules="[(val) => val > 0 || 'Must be greater than 0']"
        />
        <q-checkbox v-model="store.show_snr" label="Show SNR" />
        <div>
          <q-btn label="OK" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
// import OlMap from "OlMap";

import { defineComponent } from "vue";
import { computed } from "vue";
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import {
  validateCallsign,
  validateGridSquare,
  normalizeCallsign,
  normalizeGridSquare
} from "src/utils/validation";

export default defineComponent({
  name: "SettingsPage",
  setup() {
    const store = useSettingsStore();
    const { gridw, callsignw } = storeToRefs(useSettingsStore);
    const callsign = ref(store.callsign);
    const grid = ref(store.grid);
    const mode = "callsign";

    // Validation rules for Quasar inputs
    const validateCallsignRule = (val) => {
      const result = validateCallsign(val);
      return result === true || result;
    };

    const validateGridRule = (val) => {
      const result = validateGridSquare(val);
      return result === true || result;
    };

    return {
      store,
      callsign,
      callsignw,
      gridw,
      grid,
      mode,
      onSubmit,
      validateCallsignRule,
      validateGridRule,
      normalizeCallsign,
      normalizeGridSquare,
    };

    function onSubmit(e) {
      // Normalize inputs before saving
      const normalizedCallsign = normalizeCallsign(callsign.value);
      const normalizedGrid = normalizeGridSquare(grid.value);

      // Validate before saving
      if (store.track_callsign && validateCallsign(normalizedCallsign) !== true) {
        return;
      }

      if (store.track_grid && validateGridSquare(normalizedGrid) !== true) {
        return;
      }

      // Save to store
      store.callsign = normalizedCallsign;
      store.grid = normalizedGrid;

      // Show success notification
      console.log("Settings saved:", { callsign: normalizedCallsign, grid: normalizedGrid });
    }
  },
  mounted() {
    // this.store.$subscribe((mutation, state) => {
    //   console.log(
    //     "state chsssange ",
    //     mutation.events.oldValue,
    //     mutation.events.newValue
    //   );
    // })
  },
  methods: {
    // onSubmit() {
    //   console.log("SUBMITTED")
    //   this.store.grid = grid
    // },
    // changeTopic() {
    //   console.log("change!");
    //   this.store.topic = this.topic;
    // },
    // changeCallsign() {
    //   this.store.callsign = this.callsign;
    // },
    // changeGrid() {
    //   this.store.grid = this.grid;
    // },
    // changeMode() {
    //   if (this.store.mode == "grid") {
    //     this.store.topic = `pskr/filter/v2/+/+/+/+/${this.store.grid}/#`;
    //   } else {
    //     this.store.topic = `pskr/filter/v2/+/+/${this.store.callsign}/#`;
    //   }
    //   console.log("Mode change", this.mode, this.store.topic);
    // },
    // changeTTL() {
    //   console.log("TTL");
    //   this.store.report_ttl = this.report_ttl;
    // },
    // ttl(){
    //   return this.store.report_ttl
    // }
    fooo(ss) {
      console.log(ss);
    },
  },
  data() {
    return {
      // broker: "mqtt.pskreporter.info",
      // callsign: this.store.callsign,
      // topic: "pskr/filter/v2/+/+/+/+/IO91/#",
      // report_ttl: this.store.report_ttl,
      // //mode: "callsign",
      // grid: this.store.grid,
    };
  },
});
</script>

<style lang="sass" scoped>
.settings-page
  padding-top: 120px
  min-height: 100vh

.settings-content
  max-width: 800px
  margin: 0 auto

// Mobile responsive
@media (max-width: 599px)
  .settings-page
    padding-top: 140px
</style>
