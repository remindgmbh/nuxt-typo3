<template>
    <component :is="tag" class="t3-menu">
        <slot :active-item-id="activeItemId" />
    </component>
</template>

<script setup lang="ts">
import { provide, readonly, ref, watch } from 'vue'
import { useRoute } from '#app'
import { activeItemIdSymbol, setActiveItemIdSymbol } from './shared'

withDefaults(
    defineProps<{
        tag?: keyof HTMLElementTagNameMap
    }>(),
    { tag: 'nav' }
)

const activeItemId = ref<string | undefined>()
const route = useRoute()

provide(activeItemIdSymbol, readonly(activeItemId))
provide(
    setActiveItemIdSymbol,
    (id?: string) =>
        (activeItemId.value = activeItemId.value === id ? undefined : id)
)

watch(route, () => (activeItemId.value = undefined))
</script>

<style lang="scss">
.t3-menu {
    position: relative;
}
</style>
