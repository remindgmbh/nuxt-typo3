<template>
    <component :is="tag" class="t3-topbar-layout-header">
        <slot />
    </component>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject } from 'vue'
import { registerHeaderSymbol } from './shared'

withDefaults(
    defineProps<{
        tag?: keyof HTMLElementTagNameMap
    }>(),
    { tag: 'header' }
)

const register = inject(registerHeaderSymbol)
const currentInstance = getCurrentInstance()

if (register && currentInstance && currentInstance.proxy) {
    register(currentInstance.proxy)
}
</script>

<style lang="scss">
.t3-topbar-layout-header {
    position: sticky;
    top: 0;
    z-index: 1;
}
</style>
