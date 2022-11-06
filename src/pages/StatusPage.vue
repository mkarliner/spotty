<template>
  <q-page class="flex flex-center ">
    <div class="q-pa-md">
      <div class="row no-wrap ">
        <div class="col-6">
          <q-markup-table>
            <tbody>
              <tr>
                <td>Current number of spots</td>
                <td>{{ num_spots }}</td>
              </tr>
              <!-- <tr>
                <td>Average Latency</td>
                <td>{{ avg_latency }}</td>
              </tr> -->
              <tr>
                <td>Band Spots</td>
              </tr>
              <tr v-for="(band, count) in spot_counter" :key="count">
                <td>{{ count }}</td>
                <td>
                  {{ band }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
        <!-- <div class="col-6">adsf</div> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
import { computed, ref, reactive } from "vue-demi";

export default {
  setup() {
    const store = useSettingsStore();
    console.log("Log setup");
    const styleObject = {
      "background-color": "pink",
    };

    // const spot_counts = reactive({})
    const { report_points } = storeToRefs(store);
    // const r = reactive({})

    const spot_counter = computed(() => {
      var spot_counts = {
        "160m": 0,
        "80m": 0,
        "40m": 0,
        "30m": 0,
        "20m": 0,
        "15m": 0,
        "12m": 0,
        "10m": 0,
      };
      for (var p in store.report_points) {
        // console.log("REP ", store.report_points[p], spot_counts.value);
        let r = store.report_points[p];
        // console.log("RRR ", r);
        // console.log("ded ", store.report_points[p].report.b);
        if (spot_counts[r.report.b]) {
          spot_counts[r.report.b] += 1;
        } else {
          spot_counts[r.report.b] = 1;
        }
      }
      return spot_counts;
    });

    const avg_latency = computed(() => {
      return "5";
    });

    const num_spots = computed(() => {
      return Object.keys(store.report_points).length;
    });
    return {
      store,
      report_points,
      styleObject,
      num_spots,
      avg_latency,
      spot_counter,
    };
  },

  methods: {
    bcolor(bandstr) {
      const col = this.sty(bandstr);
      return { "background-color": col };
    },
    sty(bandstr) {
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
          return "#B11A28";
        case "10m":
          return "pink";
        case "6m":
          return "#FD001D";
      }
      return "grey";
    },
  },
};
</script>


<style lang="sass" scoped>
.row > div
  width: 100%
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)
.row + .row
  margin-top: 1rem
</style>
