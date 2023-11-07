<template>
    <component :is="tag" class="topbar-layout-content">
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
    { tag: 'main' }
)

const { injectRegisterContent } = useT3TopbarLayout()

const register = injectRegisterContent()
const currentInstance = getCurrentInstance()

if (register && currentInstance && currentInstance.proxy) {
    register(currentInstance.proxy)
}
</script>

<style lang="scss">
.topbar-layout-content {
    flex-grow: 1;
}
</style>
