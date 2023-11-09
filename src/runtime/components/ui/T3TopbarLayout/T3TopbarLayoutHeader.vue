<template>
    <component :is="tag" class="t3-topbar-layout-header">
        <slot />
    </component>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { useT3TopbarLayout } from '#imports'

withDefaults(
    defineProps<{
        tag?: keyof HTMLElementTagNameMap
    }>(),
    { tag: 'header' },
)

const { injectRegisterHeader } = useT3TopbarLayout()

const register = injectRegisterHeader()
const currentInstance = getCurrentInstance()

if (register && currentInstance && currentInstance.proxy) {
    register(currentInstance.proxy)
}
</script>

<style lang="scss">
.t3-topbar-layout-header {
    position: sticky;
    top: 0;
    z-index: 10;
}
</style>
