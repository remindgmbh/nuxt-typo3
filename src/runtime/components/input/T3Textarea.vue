<template>
    <T3Input
        :id="name"
        v-model="value"
        class="t3-textarea"
        :disabled="disabled"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        type="textarea"
        @blur="handleBlur"
    />
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'

const props = defineProps<{
    name: string
    validation?: RuleExpression<any>
    defaultValue?: string | number
    placeholder?: string
    disabled?: boolean
    required?: boolean
}>()

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, handleBlur } = useField(() => props.name, props.validation, {
    initialValue: props.defaultValue,
})
</script>
