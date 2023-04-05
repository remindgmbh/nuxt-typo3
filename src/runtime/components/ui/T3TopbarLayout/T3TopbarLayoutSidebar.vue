<template>
    <transition
        v-bind="transition"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
        @after-leave="onAfterLeave"
    >
        <component :is="tag" v-if="modelValue" class="t3-topbar-layout-sidebar">
            <slot :close="() => emit('update:modelValue', false)" />
        </component>
    </transition>
</template>

<script setup lang="ts">
import { ref, inject, TransitionProps } from 'vue'
import { scrollbarDisabledSymbol } from './shared'

enum Status {
    Entering,
    Leaving,
}

withDefaults(
    defineProps<{
        modelValue: boolean
        tag?: keyof HTMLElementTagNameMap
        transition?: TransitionProps
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

function onBeforeEnter(): void {
    if (status.value !== Status.Leaving) {
        if (scrollbarDisabled) scrollbarDisabled.value = true
    }
    status.value = Status.Entering
}

function onBeforeLeave(): void {
    status.value = Status.Leaving
}

function onAfterLeave(): void {
    if (status.value === Status.Leaving) {
        if (scrollbarDisabled) scrollbarDisabled.value = false
        status.value = Status.Entering
    }
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
