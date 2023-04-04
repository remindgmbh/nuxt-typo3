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
        modelValue?: string
        items: any[]
        tag?: keyof HTMLElementTagNameMap
        idField?: string
    }>(),
    { tag: 'nav', idField: 'id', modelValue: undefined }
)

const emit = defineEmits<{
    (e: 'update:modelValue', value?: string): void
}>()

const activeItemId = ref<string>()

const route = useRoute()

function close() {
    activeItemId.value = undefined
}

function toggle(id: string) {
    activeItemId.value = activeItemId.value === id ? undefined : id
}

const activeItem = computed(() =>
    props.items.find((item) => item[props.idField] === activeItemId?.value)
)

watch(
    () => props.modelValue,
    (value) => (activeItemId.value = value)
)

watch(activeItemId, (value) => emit('update:modelValue', value))

watch(route, () => (activeItemId.value = undefined))
</script>
