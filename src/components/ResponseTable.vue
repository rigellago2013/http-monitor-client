<template>
  <b-container fluid class="table-container px-4 py-4">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <b-table
      v-if="responses.length"
      :items="responses"
      :fields="fields"
      striped
      bordered
      hover
      responsive
      class="styled-table"
    >
      <template #cell(headers)="data">
        <b-table :items="convertHeaders(data.item.headers)" bordered small>
          <template #cell(headerKey)="nestedData">
            <b>{{ formatHeaderName(nestedData.item.key) }}</b>
          </template>
          <template #cell(headerValue)="nestedData">
            <pre>{{ formatValue(nestedData.item.value) }}</pre>
          </template>
        </b-table>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const loading = computed(() => store.getters.isLoading);
    const error = computed(() => store.getters.error);
    const responses = computed(() => store.getters.allResponses);

    const fields = [
      { key: '_id', label: 'ID' },
      { key: 'data', label: 'Payload' },
      { key: 'headers', label: 'Headers' },
      { key: 'json', label: 'JSON' },
      { key: 'method', label: 'Method' },
      { key: 'origin', label: 'Origin' },
      { key: 'url', label: 'URL' },
    ];

    const convertHeaders = (headers) => {
      return Object.entries(headers).map(([key, value]) => ({ key, value }));
    };

    const formatValue = (value) => {
      if (value === undefined || value === null) return '';
      if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
      }
      return value.toString();
    };

    const formatHeaderName = (header) => {
      return header
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
    };

    const startPolling = () => {
      store.dispatch('fetchResponses'); // Initial fetch
      pollingInterval = setInterval(() => {
        store.dispatch('fetchResponses');
      }, 1000);
    };

    let pollingInterval;

    onMounted(() => {
      startPolling();
    });

    onUnmounted(() => {
      clearInterval(pollingInterval);
    });

    return {
      loading,
      error,
      responses,
      fields,
      convertHeaders,
      formatValue,
      formatHeaderName,
    };
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
}

.loading,
.error {
  text-align: center;
  margin-top: 1rem;
}

.error {
  color: red;
}
</style>