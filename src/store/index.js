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
    ADD_RESPONSES(state, responses) {
      // Use unshift to add new responses at the top
      state.responses.unshift(...responses);
    },
    ADD_RESPONSE(state, response) {
      state.responses.unshift(response); // Ensures new single response is also added on top
    },
  },
  actions: {
    async fetchResponses({ commit, state }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null); // Reset error state before fetch
      try {
        const { data } = await axios.get('http://http-monitor-server-production.up.railway.app/ping/history');
        const newResponses = data.filter(response => {
          return !state.responses.some(existingResponse => existingResponse._id === response._id);
        });
  
        if (newResponses.length) {
          commit('ADD_RESPONSES', newResponses);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          commit('SET_ERROR', error.response ? error.response.data.message : 'Network error');
        } else {
          commit('SET_ERROR', 'An unexpected error occurred');
        }
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
