<template>
    <input
        autocomplete="off"
        :checked="checked"
        :disabled="disabled"
        :required="required"
        type="checkbox"
        :value="value"
        @blur="handleBlur"
        @change="handleChange"
    />
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'

export interface Props {
    name: string
    defaultValue?: string[]
    disabled?: boolean
    required?: boolean
    value: string
    validation?: RuleExpression<any>
}

const props = defineProps<Props>()

const model = defineModel<string[]>({ default: [] })

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { checked, handleChange, handleBlur } = useField<string | string[]>(
    () => props.name,
    props.validation,
    {
        checkedValue: props.value,
        initialValue: props.defaultValue ?? model.value,
        syncVModel: true,
        type: 'checkbox',
    },
)

if (props.defaultValue) {
    model.value = props.defaultValue
}
</script>
