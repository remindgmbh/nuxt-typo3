<template>
    <component
        :is="tag"
        :disabled="disabled"
        class="t3-menu-trigger"
        @click="toggle"
    >
        <slot :active="activeItemId === id" />
    </component>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { activeItemIdSymbol, setActiveItemIdSymbol } from './shared'

const props = withDefaults(
    defineProps<{
        id: string
        disabled?: boolean
        tag?: keyof HTMLElementTagNameMap
    }>(),
    { tag: 'button' }
)

const setActiveItemId = inject(setActiveItemIdSymbol)
const activeItemId = inject(activeItemIdSymbol)

function toggle(e: MouseEvent): void {
    e.stopPropagation()
    setActiveItemId?.(props.id)
}
</script>
