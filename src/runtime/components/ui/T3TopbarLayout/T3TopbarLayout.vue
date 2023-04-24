<template>
    <div ref="el" class="t3-topbar-layout">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from 'vue'
import { useLogger } from '#nuxt-logger'
import {
    registerContentSymbol,
    registerHeaderSymbol,
    scrollbarDisabledSymbol,
} from './shared'
import { onMounted, provide, ref, watch } from '#imports'

const props = withDefaults(
    defineProps<{
        scrollbarDisabled?: boolean
    }>(),
    { scrollbarDisabled: false }
)

const logger = useLogger()
const content = ref<ComponentPublicInstance>()
const header = ref<ComponentPublicInstance>()
const scrollbarDisabled = ref(false)

provide(registerHeaderSymbol, (instance) => (header.value = instance))
provide(registerContentSymbol, (instance) => (content.value = instance))
provide(scrollbarDisabledSymbol, scrollbarDisabled)

const emit = defineEmits<{
    (e: 'update:scrollbarDisabled', value: boolean): void
}>()

onMounted(() => {
    if (!header.value) {
        logger.warn('T3TopbarLayoutHeader component missing')
    }
    if (!content.value) {
        logger.warn('T3TopbarLayoutContent component missing')
    }
    // Do assigment in mounted hook to trigger watch
    scrollbarDisabled.value = props.scrollbarDisabled
})

watch(
    () => props.scrollbarDisabled,
    (value) => (scrollbarDisabled.value = value)
)

watch(scrollbarDisabled, (value) => {
    document.documentElement.style.overflowY = value ? 'hidden' : 'initial'
    emit('update:scrollbarDisabled', value)
})
</script>

<style lang="scss">
.t3-topbar-layout {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100vh;
}
</style>
