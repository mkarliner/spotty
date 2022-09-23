<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input v-model="broker" label="Broker"/>
    </div>
    <!-- <div class="q-gutter-md" style="max-width: 500px">
      <q-input v-model="topic" label="Topic"/>
    </div> -->
    <q-form   @keydown.enter.prevent="changeTopic" >
        <q-input label="Topic" type="text" v-model="topic" />
    </q-form>
    <div class="q-pa-md">
    <q-input
      v-model.number="report_ttl"
      @change="changeTTL"
      label="Time to Live"
      type="number"
      style="max-width: 200px"
    />
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
    // report_ttl = computed(() => store.report_ttl;
    return {
      store,
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
      topic: "pskr/filter/+/+/+/+/IO91/#",
      report_ttl: this.store.report_ttl
    }
  }
});
</script>
