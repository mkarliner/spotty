<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-btn-toggle
        v-model="mode"
        @click="changeMode"
        push
        glossy
        toggle-color="primary"
        :options="[
          {label: 'Callsign', value: 'callsign'},
          {label: 'Grid', value: 'grid'},
        ]"
      />
      <q-input v-model="broker" label="Broker"/>

      <q-form   @keydown.enter.prevent="changeCallsign" >
        <q-input label="Callsign" type="text" v-model="callsign" />
    </q-form>
    <q-form   @keydown.enter.prevent="changeGrid" >
        <q-input label="Grid" type="text" v-model="grid" />
    </q-form>

      <q-form   @keydown.enter.prevent="changeTopic" >
        <q-input label="Topic" type="text" v-model="topic" />
    </q-form>
      <q-input
      v-model.number="report_ttl"
      @change="changeTTL"
      label="Time to Live"
      type="number"
      style="max-width: 200px"
    />
    </div>
    <!-- <div class="q-gutter-md" style="max-width: 500px">
      <q-input v-model="topic" label="Topic"/>
    </div> -->

    <div class="q-pa-md">

  </div>
  </div>
  </q-page>
</template>

<script>
// import OlMap from "OlMap";

import { defineComponent } from "vue";
import {computed} from "vue";
import { useSettingsStore} from 'stores/settings'
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

export default defineComponent({
  name: "SettingsPage",
  setup() {
    const store = useSettingsStore()
    const mode = ref(null)
    // report_ttl = computed(() => store.report_ttl;
    return {
      store
      // report_ttl
    }
   },
  mounted(){
    // this.store.$subscribe((mutation, state) => {
    //   console.log(
    //     "state chsssange ",
    //     mutation.events.oldValue,
    //     mutation.events.newValue
    //   );
    // })
  },
  methods: {
    changeTopic(){
        console.log("change!")
        this.store.topic = this.topic
    },
    changeCallsign(){

    },
    changeGrid() {

    },
    changeMode(){
      if(this.mode == 'grid') {
        this.store.topic = `pskr/filter/v2/+/+/+/+/${this.store.grid}/#`
      } else {
        this.store.topic = `pskr/filter/v2/+/+/+/+/${this.store.callsign}/#`
      }
      console.log("Mode change", this.mode, this.store.topic)
    },
    changeTTL(){
        console.log("TTL")
        this.store.report_ttl = this.report_ttl
    }
    // ttl(){
    //   return this.store.report_ttl
    // }
  },
  data() {
    return {

      broker: "mqtt.pskreporter.info",
      callsign: this.store.callsign,
      topic: "pskr/filter/v2/+/+/+/+/IO91/#",
      report_ttl: this.store.report_ttl,
      mode: "callsign",
      grid: this.store.grid
    }
  }
});
</script>
