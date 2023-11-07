<template>
    <input
        :id="name"
        v-model="value"
        class="input"
        :name="name"
        @blur="onBlur"
        @input="onInput"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    modelValue: any
    name: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
    (e: 'blur', ev: Event): void
    (e: 'input', ev: Event): void
}>()

function onBlur(ev: Event) {
    emit('blur', ev)
}

function onInput(ev: Event) {
    emit('input', ev)
}

const value = computed({
    get() {
        return props.modelValue
    },
    set(value: any) {
        emit('update:modelValue', value)
    },
})
</script>
