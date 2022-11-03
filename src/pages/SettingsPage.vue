<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">

        <!-- <q-input v-model="broker" label="Broker" /> -->

        <q-checkbox v-model="store.track_callsign" label="Track callsign" />
        <q-input
          label="Callsign"
          type="text"
          mask="NNNNNNNN"
          :model-value="store.callsign"
          @input="event => {callsign = event.target.value; console.log('ddd')}"
          @update:modelValue = " e => callsign=e"
        />
        <q-checkbox v-model="store.track_grid" label="Track grid" />
        <q-checkbox v-model="store.show_grid" label="Show grid" />
        <q-input
          label="Grid"
          type="text"
          mask="AA##"
          :model-value="store.grid"
          @update:modelValue = " e => grid=e"
          />

        <!-- <q-form @keydown.enter.prevent="changeTopic">
          <q-input label="Topic" type="text" v-model="topic" />
        </q-form> -->
        <q-input
          v-model.number="store.report_ttl"
          label="Time to Live"
          type="number"
          style="max-width: 200px"
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

export default defineComponent({
  name: "SettingsPage",
  setup() {
    const store = useSettingsStore();
    const {gridw, callsignw} = storeToRefs(useSettingsStore)
    const callsign = ref(store.callsign)
    const grid = ref(store.grid);
    // const ttl = 60
    const mode = "callsign";
    // report_ttl = computed(() => store.report_ttl;
    return {
      store,
      callsign,
      callsignw,
      gridw,
      grid,
      // ttl,
      mode,
      onSubmit,
      // report_ttl
    };

    function onSubmit(e) {

      store.grid = grid.value;
      store.callsign = callsign.value;
      // console.log("SUBMITTED", e, callsign.value, grid.value, store.grid);
      // store.topic = [111];
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
    fooo (ss) {
      console.log(ss)
    }
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
