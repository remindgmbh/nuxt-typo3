<template>
    <component :is="tag" class="t3-menu">
        <slot :active-item-id="activeItemId" />
    </component>
</template>

<script setup lang="ts">
import { computed, provide, readonly, watch } from 'vue'
import { useRoute } from '#app'
import { activeItemIdSymbol, setActiveItemIdSymbol } from './shared'

const props = withDefaults(
    defineProps<{
        tag?: keyof HTMLElementTagNameMap
        activeItemId: string | null
    }>(),
    { tag: 'nav' }
)

const emit = defineEmits(['update:activeItemId'])

const activeItemId = computed({
    get() {
        return props.activeItemId
    },
    set(value) {
        emit('update:activeItemId', value)
    },
})

const route = useRoute()

provide(activeItemIdSymbol, readonly(activeItemId))
provide(
    setActiveItemIdSymbol,
    (id: string | null) =>
        (activeItemId.value = activeItemId.value === id ? null : id)
)

watch(route, () => (activeItemId.value = null))
</script>

<style lang="scss">
.t3-menu {
    position: relative;
}
</style>
