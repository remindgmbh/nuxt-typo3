<template>
    <input :id="name" v-model="value" class="t3-input" :name="name" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    modelValue: any
    name: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
}>()

const value = computed({
    get() {
        return props.modelValue
    },
    set(value: any) {
        emit('update:modelValue', value)
    },
})
</script>
