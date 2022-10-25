import { vi } from 'vitest'
import { ref } from 'vue'

vi.mock('#app', () => ({ useRoute: () => ref({}) }))
