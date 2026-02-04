<template>
  <div v-if="showStatus" class="mqtt-status" :class="`status-${store.mqtt_status}`">
    <q-icon :name="statusIcon" size="sm" />
    <span class="status-text">{{ statusText }}</span>
    <q-tooltip v-if="store.mqtt_error">{{ store.mqtt_error }}</q-tooltip>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useSettingsStore } from 'stores/settings';

export default {
  name: 'MqttStatus',
  setup() {
    const store = useSettingsStore();

    const showStatus = computed(() => {
      if (store.show_mqtt_status_always) {
        return true; // Always show
      } else {
        // Only show when not connected
        return store.mqtt_status !== 'connected';
      }
    });

    const statusIcon = computed(() => {
      switch (store.mqtt_status) {
        case 'connected':
          return 'wifi';
        case 'connecting':
        case 'reconnecting':
          return 'sync';
        case 'disconnected':
          return 'wifi_off';
        case 'error':
          return 'error';
        default:
          return 'help';
      }
    });

    const statusText = computed(() => {
      switch (store.mqtt_status) {
        case 'connected':
          return 'Connected';
        case 'connecting':
          return 'Connecting...';
        case 'reconnecting':
          return 'Reconnecting...';
        case 'disconnected':
          return 'Disconnected';
        case 'error':
          return 'Connection Error';
        default:
          return 'Unknown';
      }
    });

    return {
      store,
      showStatus,
      statusIcon,
      statusText,
    };
  },
};
</script>

<style scoped>
.mqtt-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.875rem;
  position: fixed;
  top: 140px;
  left: 10px;
  z-index: 2000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
}

.status-connected {
  background: rgba(76, 175, 80, 0.9);
  color: white;
}

.status-connecting,
.status-reconnecting {
  background: rgba(255, 152, 0, 0.9);
  color: white;
}

.status-connecting .q-icon,
.status-reconnecting .q-icon {
  animation: spin 1s linear infinite;
}

.status-disconnected {
  background: rgba(158, 158, 158, 0.9);
  color: white;
}

.status-error {
  background: rgba(244, 67, 54, 0.9);
  color: white;
}

.status-text {
  font-weight: 500;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Tablet and below */
@media (max-width: 1023px) {
  .mqtt-status {
    top: 120px;
    left: 5px;
    font-size: 0.8rem;
    padding: 6px 10px;
  }
}

/* Mobile */
@media (max-width: 599px) {
  .mqtt-status {
    top: 110px;
    left: 5px;
    font-size: 0.75rem;
    padding: 6px 10px;
  }
}

/* Dark mode support */
.body--dark .mqtt-status {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}
</style>
