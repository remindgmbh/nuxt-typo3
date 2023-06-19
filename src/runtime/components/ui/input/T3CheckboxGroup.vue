<template>
    <fieldset class="t3-checkbox-group t3-input">
        <legend class="t3-checkbox-group__label t3-input__label">
            {{ label }}
        </legend>
        <div class="t3-checkbox-group__values">
            <T3Checkbox
                v-for="(optionLabel, optionValue) in options"
                :key="optionValue"
                :value="optionValue.toString()"
                :name="name"
                :default-value="defaultValue"
                :label="optionLabel"
                :validation="validation"
                :group-label="label"
                :disabled="disabled"
                multi
            />
        </div>
        <slot name="error" :error-message="errorMessage"></slot>
    </fieldset>
</template>

<script setup lang="ts">
import { RuleExpression, useFieldError } from 'vee-validate'

const props = defineProps<{
    name: string
    label?: string
    options: { [key: string]: string }
    defaultValue?: string[]
    validation?: RuleExpression<any>
    disabled?: boolean
}>()

const errorMessage = useFieldError(props.name)
</script>

<style lang="scss">
.t3-checkbox-group {
    margin: 0;

    &__values {
        display: flex;
    }
}
</style>
