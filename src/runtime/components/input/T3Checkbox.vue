<template>
    <input
        :id="name"
        autocomplete="off"
        :checked="checked"
        class="t3-checkbox"
        :disabled="disabled"
        :required="required"
        type="checkbox"
        @blur="handleBlur"
        @change="handleChange"
    />
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'

export interface Props {
    name: string
    defaultValue?: boolean
    validation?: RuleExpression<any>
    disabled?: boolean
    required?: boolean
}

const props = defineProps<Props>()

const model = defineModel<boolean>({ default: false })

model.value = props.defaultValue

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { checked, handleChange, handleBlur } = useField<boolean>(
    () => props.name,
    props.validation,
    {
        checkedValue: true,
        initialValue: props.defaultValue ?? model.value,
        syncVModel: true,
        type: 'checkbox',
        uncheckedValue: false,
    },
)

if (props.defaultValue) {
    model.value = props.defaultValue
}
</script>
