<template>
  <div class="empty-state">
    <q-icon :name="icon" size="64px" :color="iconColor" />
    <div class="empty-state-title">{{ title }}</div>
    <div class="empty-state-message">{{ message }}</div>
    <slot name="action"></slot>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    icon: {
      type: String,
      default: 'inbox'
    },
    iconColor: {
      type: String,
      default: 'grey-5'
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  min-height: 300px;
}

.empty-state-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 8px;
  color: var(--q-primary);
}

.body--dark .empty-state-title {
  color: var(--q-secondary);
}

.empty-state-message {
  font-size: 0.95rem;
  color: #666;
  max-width: 400px;
  line-height: 1.5;
  margin-bottom: 24px;
}

.body--dark .empty-state-message {
  color: #aaa;
}

@media (max-width: 599px) {
  .empty-state {
    padding: 32px 16px;
    min-height: 200px;
  }

  .empty-state-title {
    font-size: 1.1rem;
  }

  .empty-state-message {
    font-size: 0.9rem;
  }
}
</style>
