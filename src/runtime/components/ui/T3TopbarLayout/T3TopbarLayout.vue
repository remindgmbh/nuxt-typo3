<template>
    <div ref="el" class="t3-topbar-layout">
        <slot />
    </div>
</template>

<script setup lang="ts">
import {
    ComponentPublicInstance,
    computed,
    nextTick,
    onMounted,
    provide,
    readonly,
    ref,
    watch,
    WatchStopHandle,
} from 'vue'
import { debounce } from 'perfect-debounce'
import {
    headerHeightSymbol,
    registerContentSymbol,
    registerHeaderSymbol,
    toggleScrollbarSymbol,
} from './shared'

const logger = useLogger()
const content = ref<ComponentPublicInstance>()
const header = ref<ComponentPublicInstance>()
const headerHeight = ref('0px')

provide(registerHeaderSymbol, (instance) => (header.value = instance))
provide(registerContentSymbol, (instance) => (content.value = instance))
provide(toggleScrollbarSymbol, toggleScrollbar)
provide(headerHeightSymbol, readonly(headerHeight))

const props = withDefaults(
    defineProps<{
        scrollbarDisabled?: boolean
    }>(),
    { scrollbarDisabled: false }
)

const emit = defineEmits<{
    (e: 'update:scrollbarDisabled', value: boolean): void
    (e: 'update:sidebarVisible', value: boolean): void
}>()

const scrollbarDisabled = computed({
    get() {
        return props.scrollbarDisabled
    },
    set(value: boolean) {
        emit('update:scrollbarDisabled', value)
    },
})

let unwatchScrollbarDisabled: WatchStopHandle | undefined

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
    unwatchScrollbarDisabled = watch(scrollbarDisabled, toggleScrollbar)
})

function toggleScrollbar(disabled: boolean): void {
    // If toggleScrollbar is called from outside, scrollbarDisabled has to be synced
    if (scrollbarDisabled.value !== disabled) {
        unwatchScrollbarDisabled?.()
        scrollbarDisabled.value = disabled
        nextTick(() => {
            unwatchScrollbarDisabled = watch(scrollbarDisabled, toggleScrollbar)
        })
    }

    document.documentElement.style.overflowY = disabled ? 'hidden' : 'initial'
}
</script>

<style lang="scss">
.t3-topbar-layout {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100vh;
}
</style>
