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
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Live spots from pskreporter.info Monitoring: {{store.mode}} {{store.mode == 'callsign' ? store.callsign : store.grid}}
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/settings" label="Settings" />
        <q-route-tab to="/map" label="Map" />
        <q-route-tab to="/log" label="Log" />
        <q-route-tab to="/help" label="Help" />

      </q-tabs>
    </q-header>

    <q-page-container>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </router-view>

    </q-page-container>

    <q-footer elevated class = "bg-grey-8 text-white" >
      <q-toolbar>
        <q-toolbar-title>
          <div>G8LKD - Mike Karliner</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import {computed} from "vue";
import { useSettingsStore} from 'stores/settings'
import { storeToRefs } from 'pinia';
import { defineComponent } from "vue";
import MQTT from "src/components/MQTT.vue";

export default defineComponent({
  setup() {
    const store = useSettingsStore()
    const count = computed(() => store.topic);
    return {
      store
    }
  },
  components: {
    MQTT,
  },
})
</script>

