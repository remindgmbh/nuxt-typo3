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
    ref,
    watch,
    WatchStopHandle,
} from 'vue'
import {
    registerContentSymbol,
    registerHeaderSymbol,
    toggleScrollbarSymbol,
} from './shared'

provide(registerHeaderSymbol, (instance) => (header.value = instance))
provide(registerContentSymbol, (instance) => (content.value = instance))
provide(toggleScrollbarSymbol, toggleScrollbar)

const props = withDefaults(
    defineProps<{
        scrollbarDisabled?: boolean
    }>(),
    { scrollbarDisabled: false }
)

const emit = defineEmits<{
    (e: 'update:scrollbarDisabled', value: boolean): void
}>()

const scrollbarDisabled = computed({
    get() {
        return props.scrollbarDisabled
    },
    set(value: boolean) {
        emit('update:scrollbarDisabled', value)
    },
})

const el = ref<HTMLElement>()
const content = ref<ComponentPublicInstance>()
const header = ref<ComponentPublicInstance>()

let scrollPosition = 0
let initialPosition = 'initial'
let initialTop = 'initial'
let initialMinHeight = 'initial'
let initialHeight = 'initial'
let initialMaxHeight = 'initial'
let initialOverflow = 'initial'
let unwatchScrollbarDisabled: WatchStopHandle | undefined

const contentElement = computed(
    () => content.value?.$el as HTMLElement | undefined
)
const headerElement = computed(
    () => header.value?.$el as HTMLElement | undefined
)

const isScrollable = computed(() => {
    if (!el.value) {
        return false
    }
    const computedStyle = window.getComputedStyle(el.value)
    return (
        computedStyle.overflow === 'auto' ||
        computedStyle.overflow === 'scroll' ||
        computedStyle.overflowY === 'auto' ||
        computedStyle.overflowY === 'scroll'
    )
})

onMounted(() => {
    if (!header.value || !content.value) {
        console.warn('Header or Content missing!')
    } else {
        const contentElement = content.value.$el as HTMLElement

        initialPosition = contentElement.style.position
        initialTop = contentElement.style.top
        initialMinHeight = contentElement.style.minHeight
        initialHeight = contentElement.style.height
        initialMaxHeight = contentElement.style.maxHeight
        initialOverflow = contentElement.style.overflow

        unwatchScrollbarDisabled = watch(scrollbarDisabled, toggleScrollbar)
    }
})

function toggleScrollbar(disabled: boolean): void {
    // If toggleScrollbar is called from Sidebar scrollbarDisabled has to be synced
    if (scrollbarDisabled.value !== disabled) {
        unwatchScrollbarDisabled?.()
        scrollbarDisabled.value = disabled
        nextTick(() => {
            unwatchScrollbarDisabled = watch(scrollbarDisabled, toggleScrollbar)
        })
    }

    if (!el.value || !contentElement.value || !headerElement.value) {
        return
    }

    const element = el.value

    if (disabled) {
        const headerHeight = headerElement.value.scrollHeight

        scrollPosition = isScrollable.value ? el.value.scrollTop : scrollY

        contentElement.value.style.position = 'absolute'

        const containerHeight = element.clientHeight

        const contentHeight = containerHeight - headerHeight + scrollPosition

        contentElement.value.style.minHeight = `${contentHeight}px`
        contentElement.value.style.maxHeight = `${contentHeight}px`

        contentElement.value.style.top = `${headerHeight - scrollPosition}px`
        contentElement.value.style.overflow = 'hidden'
    } else {
        contentElement.value.style.overflow = initialOverflow
        contentElement.value.style.top = initialTop
        contentElement.value.style.position = initialPosition
        contentElement.value.style.minHeight = initialMinHeight
        contentElement.value.style.height = initialHeight
        contentElement.value.style.maxHeight = initialMaxHeight
        const scrollableContainer = isScrollable.value ? element : window
        scrollableContainer.scrollTo({ top: scrollPosition })
    }
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
