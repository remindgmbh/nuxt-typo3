<template>
    <component
        :is="type === 'textarea' ? 'textarea' : 'input'"
        :id="name"
        class="t3-input"
        :name="name"
        :type="type"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup lang="ts">
defineProps<{
    modelValue: any
    name: string
    type:
        | 'text'
        | 'email'
        | 'number'
        | 'password'
        | 'date'
        | 'time'
        | 'tel'
        | 'textarea'
}>()

const emit = defineEmits<{
    'update:modelValue': [value?: any]
}>()
</script>
