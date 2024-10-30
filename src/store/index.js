import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    responses: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_RESPONSES(state, responses) {
      state.responses = responses;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    ADD_RESPONSE(state, response) {
      state.responses.unshift(response);
    }
  },
  actions: {
    async fetchResponses({ commit }) {
      commit('SET_LOADING', true);
      try {
        const { data } = await axios.get('https://http-monitor-server-q0j184ti2-rigels-projects-85d99a61.vercel.app/ping/history');
        console.log(data);
        commit('SET_RESPONSES', data);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    addResponse({ commit }, response) {
      commit('ADD_RESPONSE', response);
    }
  },
  getters: {
    allResponses: (state) => state.responses,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
  },
});
