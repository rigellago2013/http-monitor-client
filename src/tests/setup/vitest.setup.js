import { config } from '@vue/test-utils'

// Mock Bootstrap Vue components globally
config.global.stubs = {
  'b-container': {
    template: '<div class="b-container"><slot></slot></div>'
  },
  'b-table': {
    template: '<div class="b-table"><slot></slot></div>'
  }
}