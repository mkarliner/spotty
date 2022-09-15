<template>
  <q-page class="flex flex-center">
    <div>Settings Go Here</div>
    <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input v-model="broker" label="Broker"/>
    </div>
  </div>
  </q-page>
</template>

<script>
// import OlMap from "OlMap";

import { defineComponent } from "vue";

export default defineComponent({
  name: "SettingsPage",
  setup() {  },
  data() {
    return {
      broker: "mqtt.pskreporter.info",
      topic: ""
    }
  }
});
</script>
