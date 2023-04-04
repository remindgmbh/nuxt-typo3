<template>
    <component :is="tag">
        <slot :active-item="activeItem" :close="close" :toggle="toggle" />
    </component>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from '#app'

const props = withDefaults(
    defineProps<{
        items: any[]
        tag?: keyof HTMLElementTagNameMap
        idField?: string
    }>(),
    { tag: 'nav', idField: 'id' }
)

const emit = defineEmits<{
    (e: 'change', id?: string): void
}>()

const activeItemId = ref<string>()

const route = useRoute()

function close() {
    activeItemId.value = undefined
    emit('change')
}

function toggle(id: string) {
    activeItemId.value = activeItemId.value === id ? undefined : id
    emit('change', activeItemId.value)
}

const activeItem = computed(() =>
    props.items.find((item) => item[props.idField] === activeItemId?.value)
)

watch(route, () => (activeItemId.value = undefined))
</script>
