<template>
    <component
        :is="tag"
        :disabled="disabled"
        class="t3-menu-trigger"
        @click="toggle"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { setActiveItemIdSymbol } from './shared'

const props = withDefaults(
    defineProps<{
        id: string
        disabled?: boolean
        tag?: keyof HTMLElementTagNameMap
    }>(),
    { tag: 'button' }
)

const setActiveItemId = inject(setActiveItemIdSymbol)

function toggle(e: MouseEvent): void {
    e.stopPropagation()
    setActiveItemId?.(props.id)
}
</script>
