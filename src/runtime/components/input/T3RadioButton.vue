<template>
    <fieldset
        class="t3-radio-group t3-input"
        :class="{
            't3-radio-group--required': required,
            't3-radio-group--disabled': disabled,
            't3-radio-group--error': meta.touched && !meta.valid,
            't3-radio-group--success': meta.touched && meta.valid,
            't3-input--required': required,
            't3-input--disabled': disabled,
            't3-input--error': meta.touched && !meta.valid,
            't3-input--success': meta.touched && meta.valid,
        }"
    >
        <legend class="t3-radio-group__label t3-input__label">
            {{ label }}
        </legend>
        <div class="t3-radio-group__options">
            <div
                v-for="(optionLabel, optionValue) in options"
                :key="optionValue"
                class="t3-radio-group__option"
            >
                <input
                    :id="optionValue.toString()"
                    v-model="value"
                    class="t3-radio-group__option-value"
                    :value="optionValue.toString()"
                    type="radio"
                    :name="name"
                    :disabled="disabled"
                    @blur="handleBlur"
                />
                <label
                    class="t3-radio-group__option-label"
                    :for="optionValue.toString()"
                    >{{ optionLabel }}</label
                >
            </div>
        </div>
        <slot name="error" :error-message="errorMessage"></slot>
    </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RuleExpression, useField } from 'vee-validate'

const props = defineProps<{
    name: string
    label?: string
    options: { [key: string]: string }
    defaultValue?: string
    validation?: RuleExpression<any>
    disabled?: boolean
    required?: boolean
}>()

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { errorMessage, meta, value, handleBlur } = useField<string | undefined>(
    name,
    props.validation,
    {
        initialValue: props.defaultValue,
    }
)
</script>

<style lang="scss">
.t3-radio-group {
    margin: 0;

    &__options {
        display: flex;
    }

    &__option {
        display: flex;
        align-items: center;

        &__label {
            position: relative;
        }
    }
}
</style>
