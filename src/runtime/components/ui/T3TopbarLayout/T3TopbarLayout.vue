<template>
    <div ref="el" class="topbar-layout">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type ComponentPublicInstance, onMounted, ref, watch } from 'vue'
import { useLogger } from '#nuxt-logger'
import { useT3TopbarLayout } from '#imports'

const props = withDefaults(
    defineProps<{
        scrollbarDisabled?: boolean
    }>(),
    { scrollbarDisabled: false },
)

const {
    provideRegisterContent,
    provideRegisterHeader,
    provideScrollbarDisabled,
} = useT3TopbarLayout()

const logger = useLogger()
const content = ref<ComponentPublicInstance>()
const header = ref<ComponentPublicInstance>()
const _scrollbarDisabled = ref(false)

provideRegisterContent((instance) => (header.value = instance))
provideRegisterHeader((instance) => (content.value = instance))
provideScrollbarDisabled(_scrollbarDisabled)

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
    (value) => (_scrollbarDisabled.value = value),
)

watch(_scrollbarDisabled, (value) => {
    document.documentElement.style.overflowY = value ? 'hidden' : 'initial'
    emit('update:scrollbarDisabled', value)
})
</script>

<style lang="scss">
.topbar-layout {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100vh;
}
</style>
