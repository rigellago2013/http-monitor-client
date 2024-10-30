import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, config } from '@vue/test-utils';
import { createStore } from 'vuex';
import ResponseTable from '@/components/ResponseTable.vue';

// Setup Bootstrap Vue stubs locally
config.global.stubs = {
  'b-container': true,
  'b-table': {
    template: '<table class="styled-table"><slot></slot></table>',
    props: ['items', 'fields']
  }
};

// Mock store
const createVuexStore = (state = {}) => {
  return createStore({
    state: {
      loading: false,
      error: null,
      responses: [],
      ...state,
    },
    getters: {
      isLoading: (state) => state.loading,
      error: (state) => state.error,
      allResponses: (state) => state.responses,
    },
    actions: {
      fetchResponses: vi.fn(),
    },
  });
};

// Sample test data
const mockResponses = [
  {
    _id: '1',
    data: { test: 'data' },
    headers: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'test-value',
    },
    json: { key: 'value' },
    method: 'GET',
    origin: 'localhost',
    url: 'http://example.com',
  },
];

describe('ResponseTable.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (wrapper) {
      wrapper.unmount();
    }
  });


  it('converts headers correctly', async () => {
    store = createVuexStore({ responses: mockResponses });
    wrapper = mount(ResponseTable, {
      global: {
        plugins: [store],
      },
    });

    const convertedHeaders = wrapper.vm.convertHeaders(mockResponses[0].headers);
    expect(convertedHeaders).toEqual([
      { key: 'Content-Type', value: 'application/json' },
      { key: 'X-Custom-Header', value: 'test-value' },
    ]);
  });


  it('formats values correctly', () => {
    store = createVuexStore();
    wrapper = mount(ResponseTable, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.vm.formatValue(null)).toBe('');
    expect(wrapper.vm.formatValue(undefined)).toBe('');
    expect(wrapper.vm.formatValue({ test: 'value' })).toBe(JSON.stringify({ test: 'value' }, null, 2));
    expect(wrapper.vm.formatValue('simple string')).toBe('simple string');
  });

  it('starts polling on mount and cleans up on unmount', () => {
    store = createVuexStore();
    const fetchSpy = vi.spyOn(store, 'dispatch');

    wrapper = mount(ResponseTable, {
      global: {
        plugins: [store],
      },
    });

    expect(fetchSpy).toHaveBeenCalledWith('fetchResponses');
    vi.advanceTimersByTime(1000);
    expect(fetchSpy).toHaveBeenCalledTimes(2);

    wrapper.unmount();
    vi.advanceTimersByTime(1000);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  
});