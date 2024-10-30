<template>
  <div>
    <AppHeader />
    <ResponseTable />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import AppHeader from '../components/AppHeader.vue';
import ResponseTable from '../components/ResponseTable.vue';

export default {
  components: { AppHeader, ResponseTable },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch('fetchResponses');
    });

    return {};
  },
};
</script>
