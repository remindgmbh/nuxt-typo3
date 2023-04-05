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
import { scrollbarDisabledSymbol } from './shared'

enum Status {
    Entering,
    Leaving,
}

const props = withDefaults(
    defineProps<{
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

const scrollbarDisabled = inject(scrollbarDisabledSymbol)

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const status = ref(Status.Entering)

function onBeforeEnter(element: HTMLElement): void {
    if (status.value !== Status.Leaving) {
        if (scrollbarDisabled) scrollbarDisabled.value = true
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
        if (scrollbarDisabled) scrollbarDisabled.value = false
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
    height: 100%;
}
</style>
