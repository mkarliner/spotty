<template>
  <q-page class="flex flex-center">
  <div class="q-pa-md">
    <q-markup-table>
      <tbody>
      <tr v-for="p in this.store.report_points"
            v-bind:key="p.sequenceNumber"
              :sequenceNumber="p.sequenceNumber"
              :report="p"
              :coordinate="p.coordinate"
              :band="p.band"
              :callsign="p.callsign"
            >
            <td :style="bcolor(p.band)">{{p.band}}</td>
            <td>{{p.report.rc}}</td>
            <td>{{p.report.rl}}</td>
            <td>{{p.report.sc}}</td>
            <td>{{p.report.sl}}</td>
          </tr>
        </tbody>
    </q-markup-table>
  </div>
  </q-page>
</template>



<script>

import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";







export default {
  setup () {
    const store = useSettingsStore();
    console.log("Log setup")
    const styleObject = {
      'background-color': "pink"
    }
    return {
      store,
      styleObject
    }
  },
  computed: {

  },

  methods: {
    bcolor(bandstr) {
      const col = this.sty(bandstr)
      return {'background-color': col}
    },
    sty (bandstr) {
      // console.log("aartr", bandstr)

     // console.log(bandstr)
       switch (bandstr) {
        case "40m":
          return "blue";
        case "30m":
          return "green";
        case "20m":
          return "orange";
        case "17m":
          return "yellow";
        case "15m":
          return "#CAA36A";
        case "12m":
          return "#B11A28"
        case "10m":
          return "pink";
        case "6m":
          return "#FD001D";
      }
      return "grey";
    }
  }
}
</script>


