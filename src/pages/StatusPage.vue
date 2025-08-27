<template>
  <q-page class="status-page">
    <div class="q-pa-md status-content">
      <!-- Charts Row -->
      <div class="row q-gutter-md q-mb-lg">
        <!-- Band Activity Chart -->
        <div class="col-12">
          <q-card class="chart-card">
            <q-card-section>
              <div class="text-h6 q-mb-md">
                <q-icon name="bar_chart" class="q-mr-sm" />
                Band Activity
              </div>
              <div class="chart-container">
                <canvas ref="bandChart"></canvas>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="row q-gutter-md">
        <div class="col-12">
          <q-card class="recent-activity-card">
            <q-card-section>
              <div class="text-h6 q-mb-md">
                <q-icon name="schedule" class="q-mr-sm" />
                Recent Activity
              </div>
              <q-list separator>
                <q-item
                  v-for="spot in recent_spots"
                  :key="spot.id"
                  class="q-pa-sm"
                >
                  <q-item-section
                    avatar
                    style="max-width: 55px; min-width: 55px"
                  >
                    <q-chip
                      :style="{ backgroundColor: getBandColor(spot.band) }"
                      text-color="white"
                      size="sm"
                      dense
                    >
                      {{ spot.band }}
                    </q-chip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium">
                      {{ spot.tx }} → {{ spot.rx }}
                    </q-item-label>
                    <q-item-label caption>
                      SNR: {{ spot.snr }}dB • {{ spot.time }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Stats Cards at Bottom -->
      <div class="row q-gutter-md q-mt-lg">
        <div class="col-12 col-md-6">
          <q-card class="stat-card">
            <q-card-section class="text-center">
              <div class="stat-number text-primary">{{ num_spots }}</div>
              <div class="stat-label">Total Spots</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card class="stat-card">
            <q-card-section class="text-center">
              <div class="stat-number" :class="latency_color">
                {{ connection_latency }}s
              </div>
              <div class="stat-label">Latency</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

export default {
  setup() {
    const store = useSettingsStore();

    // Chart refs
    const bandChart = ref(null);
    let bandChartInstance = null;

    // Basic statistics
    const num_spots = computed(() => {
      return Object.keys(store.report_points).length;
    });

    const connection_latency = computed(() => {
      return Math.round((Date.now() - store.last_spot) / 1000);
    });

    const latency_color = computed(() => {
      const latency = connection_latency.value;
      if (latency < 30) return "text-green";
      if (latency < 60) return "text-yellow";
      return "text-red";
    });

    // Band statistics for table
    const band_stats = computed(() => {
      const stats = {};
      const spots = Object.values(store.report_points);

      spots.forEach((spot) => {
        const band = spot.report?.b;
        if (!band) return;

        if (!stats[band]) {
          stats[band] = {
            band,
            count: 0,
            avg_snr: 0,
            max_snr: -999,
            min_snr: 999,
            snr_values: [],
          };
        }

        stats[band].count++;
        const snr = parseFloat(spot.report?.rp);
        if (!isNaN(snr)) {
          stats[band].snr_values.push(snr);
          stats[band].max_snr = Math.max(stats[band].max_snr, snr);
          stats[band].min_snr = Math.min(stats[band].min_snr, snr);
        }
      });

      // Calculate averages and conditions
      return Object.values(stats)
        .map((stat) => {
          if (stat.snr_values.length > 0) {
            stat.avg_snr = (
              stat.snr_values.reduce((sum, snr) => sum + snr, 0) /
              stat.snr_values.length
            ).toFixed(1);
          } else {
            stat.avg_snr = "N/A";
            stat.max_snr = "N/A";
            stat.min_snr = "N/A";
          }

          return stat;
        })
        .sort((a, b) => b.count - a.count);
    });

    // Recent spots for activity feed
    const recent_spots = computed(() => {
      const spots = Object.values(store.report_points)
        .filter((spot) => spot.timestamp)
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 10);

      return spots.map((spot, index) => ({
        id: index,
        band: spot.report?.b || "Unknown",
        tx: spot.report?.sc || "Unknown",
        rx: spot.report?.rc || "Unknown",
        snr: spot.report?.rp || "N/A",
        time: new Date(spot.timestamp).toLocaleTimeString(),
      }));
    });

    // Table columns
    const band_columns = [
      { name: "band", label: "Band", field: "band", align: "left" },
      {
        name: "count",
        label: "Spots",
        field: "count",
        align: "center",
        sortable: true,
      },
      {
        name: "avg_snr",
        label: "Avg SNR",
        field: "avg_snr",
        align: "center",
        sortable: true,
      },
      {
        name: "max_snr",
        label: "Max SNR",
        field: "max_snr",
        align: "center",
        sortable: true,
      },
      {
        name: "min_snr",
        label: "Min SNR",
        field: "min_snr",
        align: "center",
        sortable: true,
      },
    ];

    // Chart creation functions
    const createBandChart = () => {
      if (!bandChart.value) {
        console.log("Band chart canvas not available");
        return;
      }

      // Destroy any existing chart on this canvas
      const existingChart = Chart.getChart(bandChart.value);
      if (existingChart) {
        existingChart.destroy();
      }

      // Also destroy our tracked instance
      if (bandChartInstance) {
        bandChartInstance.destroy();
        bandChartInstance = null;
      }

      const ctx = bandChart.value.getContext("2d");
      const stats = band_stats.value;

      console.log("Creating band chart with stats:", stats);

      bandChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: stats.map((stat) => stat.band),
          datasets: [
            {
              label: "Number of Spots",
              data: stats.map((stat) => stat.count),
              backgroundColor: stats.map((stat) => getBandColor(stat.band)),
              borderColor: stats.map((stat) => getBandColor(stat.band)),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.parsed.y} spots`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    };

    const getBandColor = (band) => {
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

      const colors = store.dark_mode ? darkColors : lightColors;
      return colors[band] || (store.dark_mode ? "#bdbdbd" : "#808080");
    };

    const getConditionColor = (condition) => {
      const colorMap = {
        Excellent: "green",
        Good: "light-green",
        Fair: "orange",
        Poor: "red",
        Unknown: "grey",
      };
      return colorMap[condition] || "grey";
    };

    // Lifecycle hooks
    onMounted(async () => {
      await nextTick();
      console.log("StatusPage mounted, creating charts");
      createBandChart();
    });

    onUnmounted(() => {
      if (bandChartInstance) {
        bandChartInstance.destroy();
      }
    });

    // Update chart data instead of recreating charts
    const updateCharts = () => {
      if (bandChartInstance && band_stats.value) {
        const stats = band_stats.value;
        bandChartInstance.data.labels = stats.map((stat) => stat.band);
        bandChartInstance.data.datasets[0].data = stats.map(
          (stat) => stat.count,
        );
        bandChartInstance.data.datasets[0].backgroundColor = stats.map((stat) =>
          getBandColor(stat.band),
        );
        bandChartInstance.data.datasets[0].borderColor = stats.map((stat) =>
          getBandColor(stat.band),
        );
        bandChartInstance.update();
      }
    };

    // Watch for data changes and update charts
    watch(
      () => store.report_points,
      () => {
        nextTick(() => {
          updateCharts();
        });
      },
      { deep: true },
    );

    return {
      store,
      bandChart,
      num_spots,
      connection_latency,
      latency_color,
      band_stats,
      recent_spots,
      band_columns,
      getBandColor,
    };
  },

  methods: {
    bcolor(bandstr) {
      const col = this.sty(bandstr);
      return { "background-color": col };
    },
    sty(bandstr) {
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
.status-page
  padding-top: 120px
  min-height: 100vh

.status-content
  max-width: 1200px
  margin: 0 auto

.row > div
  width: 100%
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)

.row + .row
  margin-top: 1rem

// Chart styles
.stat-card
  min-height: 120px

.stat-number
  font-size: 2.5rem
  font-weight: bold
  line-height: 1

.stat-label
  font-size: 0.875rem
  opacity: 0.7
  margin-top: 0.5rem

.chart-card
  min-height: 400px

.chart-container
  position: relative
  height: 300px
  width: 100%

.stats-table-card
  .q-table
    .q-td, .q-th
      padding: 8px 16px

.recent-activity-card
  max-height: 500px
  .q-list
    max-height: 400px
    overflow-y: auto

// Mobile responsive
@media (max-width: 599px)
  .status-page
    padding-top: 140px

  .stat-number
    font-size: 2rem

  .chart-container
    height: 250px
</style>
