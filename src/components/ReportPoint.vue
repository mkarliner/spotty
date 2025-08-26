<template>
  <div :data-seqno="sequenceNumber">
    <ol-feature ref="sss" :properties="things()">
      <div :data-seqno="sequenceNumber" @click="clickty"></div>
      <ol-geom-point :coordinates="coordinate"></ol-geom-point>

      <ol-style>
        <!-- Enhanced marker for own callsign -->
        <ol-style-icon
          v-if="owncall"
          :src="markerIcon"
          :color="fillColor"
          :scale="markerScale"
        ></ol-style-icon>

        <!-- Enhanced circle markers for other stations -->
        <ol-style-circle v-else :radius="radius">
          <ol-style-fill
            :color="fillColor"
            :opacity="fillOpacity"
          ></ol-style-fill>
          <ol-style-stroke
            :color="strokeColor"
            :width="strokeWidth"
          ></ol-style-stroke>
        </ol-style-circle>

        <!-- Band indicator text -->
        <ol-style-text
          v-if="showBandLabel"
          :offsetX="bandLabelOffsetX"
          :offsetY="bandLabelOffsetY"
          :font="bandLabelFont"
          :text="bandLabel"
          :fill="bandLabelFill"
          :stroke="bandLabelStroke"
        ></ol-style-text>

        <!-- SNR text -->
        <ol-style-text
          v-if="snrText"
          :offsetX="snrOffsetX"
          :offsetY="snrOffsetY"
          :font="snrFont"
          :text="snrText"
          :fill="snrFill"
          :stroke="snrStroke"
        ></ol-style-text>
      </ol-style>
    </ol-feature>
  </div>
</template>

<script>
import { watch, ref, inject, computed, onMounted } from "vue";
import proj4 from "proj4";
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
import markerIcon from "/src/assets/marker.png";

export default {
  name: "ReportPoint",
  props: [
    "topic",
    "report",
    "rx_coordinate",
    "tx_coordinate",
    "sequenceNumber",
    "band",
    "callsign",
    "owncallsign",
  ],
  emits: ["delete", "mapclick", "click"],
  setup(props) {
    const store = useSettingsStore();
    const { show_snr, show_band_labels } = storeToRefs(store);

    // Enhanced radius based on signal strength and type
    const radius = computed(() => {
      const baseRadius = props.topic?.includes("tx") ? 8 : 6;
      const snrBonus = props.report?.rp
        ? Math.max(0, Math.min(3, props.report.rp / 10))
        : 0;
      return baseRadius + snrBonus;
    });

    // Enhanced marker scale for own callsign
    const markerScale = computed(() => {
      return props.topic?.includes("tx") ? 0.08 : 0.06;
    });

    // Fill opacity based on signal strength
    const fillOpacity = computed(() => {
      if (props.callsign === props.owncallsign) return 0.9;
      const snr = props.report?.rp || 0;
      return Math.max(0.4, Math.min(0.8, 0.4 + (snr + 20) / 50));
    });

    // Enhanced stroke width
    const strokeWidth = computed(() => {
      if (props.callsign === props.owncallsign) return 3;
      return props.topic?.includes("tx") ? 2 : 1;
    });

    // Coordinate calculation
    const coordinate = computed(() => {
      if (
        props.topic === "grid_rx_topic" ||
        props.topic === "callsign_rx_topic"
      ) {
        return proj4("EPSG:3857", props.tx_coordinate);
      } else {
        return proj4("EPSG:3857", props.rx_coordinate);
      }
    });

    // Own callsign check
    const owncall = computed(() => {
      return props.callsign === props.owncallsign;
    });

    // Enhanced color scheme
    const fillColor = computed(() => {
      const colors = {
        "160m": "#8B0000", // Dark red
        "80m": "#e54be0", // Magenta
        "60m": "#0D0067", // Dark blue
        "40m": "#0066CC", // Blue
        "30m": "#00AA00", // Green
        "20m": "#FF8800", // Orange
        "17m": "#FFDD00", // Yellow
        "15m": "#CAA36A", // Brown
        "12m": "#B11A28", // Dark red
        "10m": "#FF69B4", // Pink
        "6m": "#FD001D", // Red
        "2m": "#9932CC", // Purple
        "70cm": "#FF1493", // Deep pink
      };
      return colors[props.band] || "#808080"; // Default gray
    });

    // SNR display logic
    const snr = computed(() => {
      if (
        show_snr.value &&
        (props.report?.sc === props.owncallsign ||
          props.report?.rc === props.owncallsign)
      ) {
        return props.report?.rp?.toString() || "";
      }
      return "";
    });

    // Band label display
    const showBandLabel = computed(() => {
      return (
        show_band_labels.value &&
        (props.topic?.includes("tx") || props.callsign === props.owncallsign)
      );
    });

    const bandLabel = computed(() => props.band || "");

    // Enhanced text styling
    const bandLabelFont = computed(() => "bold 10px sans-serif");
    const snrFont = computed(() => "bold 9px monospace");

    // Text positioning
    const bandLabelOffsetX = computed(() => radius.value + 8);
    const bandLabelOffsetY = computed(() => -radius.value - 2);
    const snrOffsetX = computed(() => radius.value + 8);
    const snrOffsetY = computed(() => radius.value + 8);

    // Text colors with better contrast
    const bandLabelFill = computed(() => ({ color: "#333" }));
    const bandLabelStroke = computed(() => ({ color: "#fff", width: 1 }));
    const snrFill = computed(() => ({ color: "#000" }));
    const snrStroke = computed(() => ({ color: "#fff", width: 1 }));
    const snrText = computed(() => (snr.value ? `${snr.value}dB` : ""));

    const strokeColor = ref("#333");

    onMounted(() => {
      // Component mounted
    });

    return {
      store,
      markerIcon,
      fillColor,
      fillOpacity,
      coordinate,
      radius,
      markerScale,
      owncall,
      strokeWidth,
      strokeColor,
      snr,
      snrText,
      showBandLabel,
      bandLabel,
      bandLabelFont,
      bandLabelOffsetX,
      bandLabelOffsetY,
      bandLabelFill,
      bandLabelStroke,
      snrFont,
      snrOffsetX,
      snrOffsetY,
      snrFill,
      snrStroke,
    };
  },

  data() {
    return {
      aaa: 123,
      to: null,
    };
  },

  methods: {
    things() {
      return { seqno: this.sequenceNumber };
    },
    clickty() {
      // Handle click events
    },
  },
};
</script>

<style scoped>
.overlay-content {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
}
</style>
