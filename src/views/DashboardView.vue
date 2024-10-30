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
import { io } from 'socket.io-client';

export default {
  components: { AppHeader, ResponseTable },
  setup() {
    const store = useStore();
    const socket = io('https://http-monitor-server-q0j184ti2-rigels-projects-85d99a61.vercel.app');

    onMounted(() => {
    store.dispatch('fetchResponses');
    socket.on('newResponse', (response) => {
        console.log("New response received:", response);
        store.dispatch('addResponse', response);
    });
});

    return {};
  },
};
</script>