<template>
    <transition
        :name="transitionName"
        @before-enter="beforeEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
    >
        <component
            :is="tag"
            v-if="modelValue"
            class="t3-topbar-layout-sidebar"
            :style="{
                top: headerHeight,
                height: `calc(100% - ${headerHeight})`,
            }"
        >
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

withDefaults(
    defineProps<{
        modelValue: boolean
        tag?: keyof HTMLElementTagNameMap
        transitionName?: string
    }>(),
    { transitionName: 'sidebar-transition', tag: 'nav' }
)

const toggleScrollbar = inject(toggleScrollbarSymbol)
const headerHeight = inject(headerHeightSymbol)

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const status = ref(Status.Entering)

function beforeEnter(): void {
    if (status.value !== Status.Leaving) {
        toggleScrollbar?.(true)
    }
    status.value = Status.Entering
}

function beforeLeave(): void {
    status.value = Status.Leaving
}

function afterLeave(): void {
    if (status.value === Status.Leaving) {
        toggleScrollbar?.(false)
        status.value = Status.Entering
    }
}
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/z-indexes' as z-indexes;

.t3-topbar-layout-sidebar {
    z-index: z-indexes.$sidebar;
    position: fixed;
}
</style>
