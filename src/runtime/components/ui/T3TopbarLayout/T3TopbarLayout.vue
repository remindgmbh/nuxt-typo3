<template>
    <div ref="el" class="t3-topbar-layout">
        <slot :header-height="headerHeight" />
    </div>
</template>

<script setup lang="ts">
import {
    ComponentPublicInstance,
    onMounted,
    provide,
    readonly,
    ref,
    watch,
} from 'vue'
import { debounce } from 'perfect-debounce'
import { useLogger } from '#nuxt-logger'
import {
    headerHeightSymbol,
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
const headerHeight = ref('0px')
const scrollbarDisabled = ref(false)

provide(registerHeaderSymbol, (instance) => (header.value = instance))
provide(registerContentSymbol, (instance) => (content.value = instance))
provide(scrollbarDisabledSymbol, scrollbarDisabled)
provide(headerHeightSymbol, readonly(headerHeight))

const emit = defineEmits<{
    (e: 'update:scrollbarDisabled', value: boolean): void
}>()

onMounted(() => {
    if (!header.value) {
        logger.warn('T3TopbarLayoutHeader component missing')
    } else {
        const headerDivElement = header.value?.$el as HTMLDivElement
        const resizeObserver = new ResizeObserver(
            debounce((entries: ResizeObserverEntry[]) => {
                const entry = entries.at(0)
                if (entry) {
                    headerHeight.value = `${entry.contentRect.height}px`
                }
            }, 50)
        )
        resizeObserver.observe(headerDivElement)
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
