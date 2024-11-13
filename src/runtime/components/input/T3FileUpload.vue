<template>
    <input
        :accept="accept"
        :disabled="disabled"
        :multiple="multiple"
        :placeholder="placeholder"
        :required="required"
        type="file"
        @blur="handleBlur"
        @change="handleChange"
    />
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'

export interface Props {
    accept?: string
    defaultValue?: string
    disabled?: boolean
    multiple?: boolean
    name: string
    placeholder?: string
    required?: boolean
    validation?: RuleExpression<any>
}

const props = defineProps<Props>()

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { handleBlur, handleChange } = useField<string | undefined>(
    () => props.name,
    props.validation,
    {
        initialValue: props.defaultValue,
    },
)
</script>
