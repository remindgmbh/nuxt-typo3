<template>
    <fieldset
        class="t3-radio-button"
        :class="{
            't3-radio-button--required': required,
            't3-radio-button--disabled': disabled,
            't3-radio-button--error': meta.touched && !meta.valid,
            't3-radio-button--success': meta.touched && meta.valid,
        }"
    >
        <T3InputLabel
            class="t3-radio-button__label"
            :label="label"
            tag="legend"
        />
        <div class="t3-radio-button__options">
            <div
                v-for="(optionLabel, optionValue) in options"
                :key="optionValue"
                class="t3-radio-button__option"
            >
                <input
                    :id="optionValue.toString()"
                    v-model="value"
                    class="t3-radio-button__option-value"
                    :value="optionValue.toString()"
                    type="radio"
                    :name="name"
                    :disabled="disabled"
                    @blur="handleBlur"
                />
                <label
                    class="t3-radio-button__option-label"
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
import { type RuleExpression, useField } from 'vee-validate'

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
    },
)
</script>

<style lang="scss">
.t3-radio-button {
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
