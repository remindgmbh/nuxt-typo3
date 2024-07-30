<template>
    <input
        :id="name"
        v-model="value"
        class="t3-checkbox"
        :disabled="disabled"
        :name="name"
        :required="required"
        type="checkbox"
        :value="value"
        @blur="handleBlur"
    />
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'

const props = defineProps<{
    name: string
    defaultValue?: boolean
    validation?: RuleExpression<any>
    disabled?: boolean
    required?: boolean
}>()

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, handleBlur } = useField<string[] | boolean | undefined>(
    () => props.name,
    props.validation,
    {
        initialValue: props.defaultValue ?? false,
        type: 'checkbox',
    },
)
</script>
