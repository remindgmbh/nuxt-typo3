<template>
    <T3Input
        v-model="model"
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

export interface Props {
    defaultValue?: string | number
    disabled?: boolean
    max?: number
    min?: number
    name: string
    placeholder?: string
    required?: boolean
    step?: number
    type: 'text' | 'email' | 'number' | 'password' | 'date' | 'time' | 'tel'
    validation?: RuleExpression<any>
}

const props = defineProps<Props>()

const model = defineModel<string | number>({ default: '' })

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { handleBlur } = useField<string | number>(
    () => props.name,
    props.validation,
    {
        initialValue: props.defaultValue ?? model.value,
        syncVModel: true,
    },
)

if (props.defaultValue) {
    model.value = props.defaultValue
}
</script>
