<template>
    <T3Input
        v-model="value"
        class="t3-textfield"
        :disabled="disabled"
        :max="max"
        :min="min"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :step="step"
        :type="type"
        @blur="handleBlur"
    />
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'

const props = defineProps<{
    name: string
    type: 'text' | 'email' | 'number' | 'password' | 'date' | 'time' | 'tel'
    validation?: RuleExpression<any>
    defaultValue?: string | number | boolean
    placeholder?: string
    disabled?: boolean
    step?: number
    min?: number
    max?: number
    required?: boolean
}>()

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, handleBlur } = useField<string | number | boolean | undefined>(
    () => props.name,
    props.validation,
    {
        initialValue: props.defaultValue,
    },
)
</script>
