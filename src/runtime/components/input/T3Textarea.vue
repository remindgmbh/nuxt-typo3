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

export interface Props {
    defaultValue?: string
    disabled?: boolean
    // used from vee-validate to sync with value: https://vee-validate.logaretm.com/v4/guide/composition-api/custom-inputs/#v-model-support

    modelValue?: string
    name: string
    placeholder?: string
    required?: boolean
    validation?: RuleExpression<any>
}

const props = defineProps<Props>()

const model = defineModel<string>({ default: '' })

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, handleBlur } = useField<string>(
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
