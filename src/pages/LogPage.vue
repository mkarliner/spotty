<template>
  <q-page class="log-page">
    <div class="q-pa-md log-content">
      <q-markup-table>
        <tbody>
          <tr
            v-for="p in this.store.report_points"
            v-bind:key="p.sequenceNumber"
            :sequenceNumber="p.sequenceNumber"
            :report="p"
            :coordinate="p.coordinate"
            :band="p.band"
            :callsign="p.callsign"
          >
            <td :style="bcolor(p.band)">{{ p.band }}</td>
            <td>{{ p.countryName }}</td>
            <td>{{ p.report.rc }}</td>
            <td>{{ p.report.rl }}</td>
            <td>{{ p.report.sc }}</td>
            <td>{{ p.report.sl }}</td>
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
  setup() {
    const store = useSettingsStore();
    console.log("Log setup");
    const styleObject = {
      "background-color": "pink",
    };
    return {
      store,
      styleObject,
    };
  },
  computed: {},

  methods: {
    bcolor(bandstr) {
      const col = this.sty(bandstr);
      return { "background-color": col };
    },
    sty(bandstr) {
      // console.log("aartr", bandstr)

      // console.log(bandstr)
      const lightColors = {
        "160m": "#8B0000",
        "80m": "#e54be0",
        "60m": "#0D0067",
        "40m": "#0066CC",
        "30m": "#00AA00",
        "20m": "#FF8800",
        "17m": "#FFDD00",
        "15m": "#CAA36A",
        "12m": "#B11A28",
        "10m": "#FF69B4",
        "6m": "#FD001D",
        "2m": "#9932CC",
      };

      const darkColors = {
        "160m": "#ff6b6b",
        "80m": "#f06292",
        "60m": "#5c6bc0",
        "40m": "#42a5f5",
        "30m": "#66bb6a",
        "20m": "#ffb74d",
        "17m": "#fff176",
        "15m": "#d4b896",
        "12m": "#e57373",
        "10m": "#f48fb1",
        "6m": "#ff5722",
        "2m": "#ba68c8",
      };

      const colors = this.store.dark_mode ? darkColors : lightColors;
      return colors[bandstr] || (this.store.dark_mode ? "#bdbdbd" : "#808080");
    },
  },
};
</script>

<style lang="sass" scoped>
.log-page
  padding-top: 120px
  min-height: 100vh

.log-content
  max-width: 1200px
  margin: 0 auto

// Mobile responsive
@media (max-width: 599px)
  .log-page
    padding-top: 140px
</style>
