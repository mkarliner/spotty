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
  </div>
  </q-page>
</template>

<script>
// import OlMap from "OlMap";

import { defineComponent } from "vue";
import {computed} from "vue";
import { useSettingsStore} from 'stores/settings'
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: "SettingsPage",
  setup() {
    const store = useSettingsStore()
    return {
      store
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
    }
  },
  data() {
    return {

      broker: "mqtt.pskreporter.info",
      topic: "pskr/filter/+/+/+/+/IO91/#"
    }
  }
});
</script>
