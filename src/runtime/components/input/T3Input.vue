<template>
    <component
        :is="type === 'textarea' ? 'textarea' : 'input'"
        :id="name"
        class="t3-input"
        :name="name"
        :type="type"
        :value="model"
        @input="model = $event.target.value"
    />
</template>

<script setup lang="ts">
export interface Props {
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
}

defineProps<Props>()

const model = defineModel<unknown>()
</script>
