<template>
    <component :is="tag" class="t3-topbar-layout-content">
        <slot />
    </component>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject } from 'vue'
import { registerContentSymbol } from './shared'

withDefaults(
    defineProps<{
        tag?: keyof HTMLElementTagNameMap
    }>(),
    { tag: 'main' }
)

const register = inject(registerContentSymbol)
const currentInstance = getCurrentInstance()

if (register && currentInstance && currentInstance.proxy) {
    register(currentInstance.proxy)
}
</script>

<style lang="scss">
.t3-topbar-layout-content {
    flex-grow: 1;
    width: 100%;
}
</style>
