<template>
    <transition
        :name="transition.name"
        @before-enter="onBeforeEnter"
        @enter="transition.onEnter"
        @enter-cancelled="transition.onEnterCancelled"
        @before-leave="onBeforeLeave"
        @leave="transition.onLeave"
        @after-leave="onAfterLeave"
        @leave-cancelled="transition.onLeaveCancelled"
    >
        <component :is="tag" v-if="modelValue" class="t3-topbar-layout-sidebar">
            <slot :close="() => emit('update:modelValue', false)" />
        </component>
    </transition>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { headerHeightSymbol, toggleScrollbarSymbol } from './shared'

enum Status {
    Entering,
    Leaving,
}

const props = withDefaults(
    defineProps<{
        ignoreHeaderHeight?: boolean
        modelValue: boolean
        tag?: keyof HTMLElementTagNameMap
        transition?: {
            name: string
            onBeforeEnter?: (el: HTMLElement) => void
            onEnter?: (el: HTMLElement, done: () => void) => void
            onAfterEnter?: (el: HTMLElement) => void
            onEnterCancelled?: (el: HTMLElement) => void
            onBeforeLeave?: (el: HTMLElement) => void
            onLeave?: (el: HTMLElement, done: () => void) => void
            onAfterLeave?: (el: HTMLElement) => void
            onLeaveCancelled?: (el: HTMLElement) => void
        }
    }>(),
    {
        transition: () => ({
            name: 'sidebar-transition',
        }),
        tag: 'nav',
    }
)

const toggleScrollbar = inject(toggleScrollbarSymbol)
const headerHeight = props.ignoreHeaderHeight ? '0' : inject(headerHeightSymbol)

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const status = ref(Status.Entering)

function onBeforeEnter(element: HTMLElement): void {
    if (status.value !== Status.Leaving) {
        toggleScrollbar?.(true)
    }
    status.value = Status.Entering
    props.transition.onBeforeEnter?.(element)
}

function onBeforeLeave(element: HTMLElement): void {
    status.value = Status.Leaving
    props.transition.onBeforeLeave?.(element)
}

function onAfterLeave(element: HTMLElement): void {
    if (status.value === Status.Leaving) {
        toggleScrollbar?.(false)
        status.value = Status.Entering
    }
    props.transition.onAfterLeave?.(element)
}
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/z-indexes' as z-indexes;

.t3-topbar-layout-sidebar {
    z-index: z-indexes.$sidebar;
    position: fixed;
    height: calc(100% - v-bind(headerHeight));
    top: v-bind(headerHeight);
}
</style>
