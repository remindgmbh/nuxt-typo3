<template>
    <div ref="el" class="t3-topbar-layout">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, onMounted, provide, ref, watch } from 'vue'
import { useLogger } from '#nuxt-logger'
import {
    registerContentSymbol,
    registerHeaderSymbol,
    scrollbarDisabledSymbol,
} from './shared'

const props = withDefaults(
    defineProps<{
        scrollbarDisabled?: boolean
    }>(),
    { scrollbarDisabled: false }
)

const logger = useLogger()
const content = ref<ComponentPublicInstance>()
const header = ref<ComponentPublicInstance>()
const _scrollbarDisabled = ref(false)

provide(registerHeaderSymbol, (instance) => (header.value = instance))
provide(registerContentSymbol, (instance) => (content.value = instance))
provide(scrollbarDisabledSymbol, _scrollbarDisabled)

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
    _scrollbarDisabled.value = props.scrollbarDisabled
})

watch(
    () => props.scrollbarDisabled,
    (value) => (_scrollbarDisabled.value = value)
)

watch(_scrollbarDisabled, (value) => {
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
