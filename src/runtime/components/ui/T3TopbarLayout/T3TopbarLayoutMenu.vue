<template>
    <transition
        v-bind="transition"
        @after-leave="onAfterLeave"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
    >
        <component :is="tag" v-if="modelValue" class="t3-topbar-layout-menu">
            <slot :close="() => emit('update:modelValue', false)" />
        </component>
    </transition>
</template>

<script setup lang="ts">
import { type TransitionProps, ref } from 'vue'
import { useT3TopbarLayout } from '#imports'

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
        tag: 'nav',
        transition: () => ({
            name: 'menu-transition',
        }),
    },
)

const { injectScrollbarDisabled } = useT3TopbarLayout()

const scrollbarDisabled = injectScrollbarDisabled()

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
.t3-topbar-layout-menu {
    z-index: 20;
    position: fixed;
    height: 100%;
}
</style>
