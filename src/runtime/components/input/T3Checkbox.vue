<template>
    <label class="t3-checkbox" :for="name">
        <input
            :id="name"
            v-model="value"
            class="t3-checkbox__input"
            :disabled="disabled"
            :name="name"
            :required="required"
            type="checkbox"
            :value="value"
            @blur="handleBlur"
        />
        <span class="t3-checkbox__label">
            {{ label }}
        </span>
    </label>
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'

const props = defineProps<{
    name: string
    defaultValue?: boolean
    label: string
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
