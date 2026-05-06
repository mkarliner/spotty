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

        <div class="tracking-row">
          <q-checkbox v-model="store.track_callsign" label="Track callsign" class="tracking-checkbox" />
          <q-input
            label="Callsign"
            type="text"
            v-model="callsign"
            :rules="[validateCallsignRule]"
            hint="3-12 alphanumeric characters (e.g., W1ABC, G4XYZ)"
            lazy-rules
            @blur="callsign = normalizeCallsign(callsign)"
            class="tracking-input"
          />
        </div>

        <div class="tracking-row">
          <q-checkbox v-model="store.track_grid" label="Track grid" class="tracking-checkbox" />
          <q-input
            label="Grid"
            type="text"
            v-model="grid"
            :rules="[validateGridRule]"
            hint="4, 6, or 8 characters (e.g., IO91, IO91vl)"
            lazy-rules
            @blur="grid = normalizeGridSquare(grid)"
            class="tracking-input"
          />
        </div>

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

        <q-separator class="q-my-md" />
        <div class="text-h6 q-mb-md">Global Mode</div>
        <q-input
          v-model.number="store.global_spot_cap"
          label="Max global spots"
          type="number"
          style="max-width: 200px"
          hint="Oldest spots are evicted when this limit is reached"
          :rules="[(val) => val > 0 || 'Must be greater than 0']"
        />

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

<style scoped>
/* ============================================
   SETTINGS PAGE - CONTROL PANEL INTERFACE
   ============================================ */
.settings-page {
  background: var(--color-void);
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 40px;
}

.settings-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 24px;
}

/* Section Headers - Signal Display Style */
.settings-content :deep(.text-h6) {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1976d2;
  position: relative;
  padding-left: 16px;
  margin-bottom: 16px;
}

.body--dark .settings-content :deep(.text-h6) {
  color: var(--color-signal-strong);
}

.settings-content :deep(.text-h6::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 100%;
  background: #1976d2;
  box-shadow: 0 0 10px #1976d2;
}

.body--dark .settings-content :deep(.text-h6::before) {
  background: var(--color-signal-strong);
  box-shadow: 0 0 10px var(--color-signal-strong);
}

/* Form Styling */
.settings-content :deep(.q-form) {
  font-family: var(--font-body);
}

/* Tracking Row Layout */
.tracking-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.tracking-checkbox {
  flex-shrink: 0;
  padding-top: 20px; /* Align with input field */
  min-width: 150px;
}

.tracking-input {
  flex: 0 1 300px; /* Fixed width of 300px, won't grow */
  max-width: 300px;
}

/* Input Fields - Terminal Style */
.settings-content :deep(.q-field__control) {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  transition: all 0.3s ease;
  font-family: var(--font-body);
}

.settings-content :deep(.q-field__control:hover) {
  border-color: #1976d2;
  box-shadow: 0 0 0 1px rgba(25, 118, 210, 0.2);
}

.body--dark .settings-content :deep(.q-field__control:hover) {
  border-color: var(--color-signal-strong);
  box-shadow: 0 0 0 1px rgba(0, 255, 136, 0.2);
}

.settings-content :deep(.q-field--focused .q-field__control) {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.3),
              inset 0 0 10px rgba(25, 118, 210, 0.05);
}

.body--dark .settings-content :deep(.q-field--focused .q-field__control) {
  border-color: var(--color-signal-strong);
  box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.3),
              inset 0 0 10px rgba(0, 255, 136, 0.05);
}

.settings-content :deep(.q-field__native) {
  color: var(--text-primary);
  font-family: var(--font-body);
}

/* Callsign and Grid inputs - Monospace */
.settings-content :deep(.q-field__native[type="text"]) {
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Number inputs */
.settings-content :deep(.q-field__native[type="number"]) {
  font-family: var(--font-mono);
  font-weight: 600;
}

/* Labels */
.settings-content :deep(.q-field__label) {
  color: var(--text-secondary);
  font-weight: 500;
}

/* Hints */
.settings-content :deep(.q-field__bottom) {
  color: var(--text-tertiary);
  font-size: 0.75rem;
}

/* Checkbox Custom Styling */
.settings-content :deep(.q-checkbox__bg) {
  border: 2px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-surface);
  transition: all 0.3s ease;
}

.settings-content :deep(.q-checkbox__inner--truthy .q-checkbox__bg) {
  background: #1976d2;
  border-color: #1976d2;
  box-shadow: 0 0 10px rgba(25, 118, 210, 0.4);
}

.body--dark .settings-content :deep(.q-checkbox__inner--truthy .q-checkbox__bg) {
  background: var(--color-signal-strong);
  border-color: var(--color-signal-strong);
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
}

.settings-content :deep(.q-checkbox__label) {
  font-family: var(--font-body);
  color: var(--text-primary);
  font-weight: 500;
}

/* Submit Button - Command Button Style */
.settings-content :deep(.q-btn) {
  font-family: var(--font-body);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 12px 32px;
  background: linear-gradient(135deg, #1976d2 0%, #26a69a 100%);
  border: none;
  border-radius: 6px;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.body--dark .settings-content :deep(.q-btn) {
  background: linear-gradient(135deg, var(--color-signal-strong) 0%, #00d9ff 100%);
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
}

.settings-content :deep(.q-btn::before) {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.settings-content :deep(.q-btn:hover::before) {
  left: 100%;
}

.settings-content :deep(.q-btn:hover) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.5);
}

.body--dark .settings-content :deep(.q-btn:hover) {
  box-shadow: 0 6px 20px rgba(0, 255, 136, 0.5);
}

/* Separator Styling */
.settings-content :deep(.q-separator) {
  background: var(--color-border);
  opacity: 0.5;
}

/* Staggered Fade-in Animation */
.settings-content :deep(.q-form > *) {
  animation: fadeInUp 0.5s ease-out backwards;
}

.settings-content :deep(.q-form > *:nth-child(1)) { animation-delay: 0.05s; }
.settings-content :deep(.q-form > *:nth-child(2)) { animation-delay: 0.1s; }
.settings-content :deep(.q-form > *:nth-child(3)) { animation-delay: 0.15s; }
.settings-content :deep(.q-form > *:nth-child(4)) { animation-delay: 0.2s; }
.settings-content :deep(.q-form > *:nth-child(5)) { animation-delay: 0.25s; }
.settings-content :deep(.q-form > *:nth-child(6)) { animation-delay: 0.3s; }
.settings-content :deep(.q-form > *:nth-child(7)) { animation-delay: 0.35s; }
.settings-content :deep(.q-form > *:nth-child(8)) { animation-delay: 0.4s; }
.settings-content :deep(.q-form > *:nth-child(9)) { animation-delay: 0.45s; }
.settings-content :deep(.q-form > *:nth-child(10)) { animation-delay: 0.5s; }

/* Mobile Responsive */
@media (max-width: 599px) {
  .settings-page {
    padding-top: 140px;
  }

  .settings-content {
    padding: 32px 16px;
  }

  .settings-content :deep(.text-h6) {
    font-size: 1rem;
  }

  .settings-content :deep(.q-btn) {
    padding: 10px 24px;
    font-size: 0.9rem;
  }

  .tracking-row {
    flex-direction: column;
    gap: 8px;
  }

  .tracking-checkbox {
    padding-top: 0;
    min-width: auto;
  }

  .tracking-input {
    max-width: 100%;
    flex: 1;
  }
}
</style>
