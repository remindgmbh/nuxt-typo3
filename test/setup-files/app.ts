import { vi } from 'vitest'
import { ref } from 'vue'

vi.mock('#app', () => ({ useRoute: () => ref({}) }))
vi.mock('#nuxt-logger', () => ({ useLogger: () => {} }))
