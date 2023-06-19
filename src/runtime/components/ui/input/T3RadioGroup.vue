<template>
    <fieldset class="t3-radio-group t3-input">
        <legend class="t3-radio-group__label t3-input__label">
            {{ label }}
        </legend>
        <div class="t3-radio-group__values">
            <T3Radio
                v-for="(optionLabel, optionValue) in options"
                :key="optionValue"
                :name="name"
                :label="optionLabel"
                :default-value="defaultValue"
                :value="optionValue.toString()"
                :validation="validation"
                :group-label="label"
                :disabled="disabled"
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
    defaultValue?: string
    validation?: RuleExpression<any>
    disabled?: boolean
}>()

const errorMessage = useFieldError(props.name)
</script>

<style lang="scss">
.t3-radio-group {
    margin: 0;

    &__values {
        display: flex;
    }
}
</style>
