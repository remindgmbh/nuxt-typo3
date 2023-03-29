<template>
    <fieldset
        class="t3-radio-group t3-input"
        :class="{
            't3-radio-group--required': required,
            't3-radio-group--disabled': disabled,
            't3-input--required': required,
            't3-input--disabled': disabled,
        }"
    >
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
        <T3CollapseTransition>
            <div
                v-if="errorMessage"
                class="t3-radio-group__error t3-input__error"
            >
                {{ errorMessage }}
            </div>
        </T3CollapseTransition>
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
    required?: boolean
    disabled?: boolean
}>()

const errorMessage = useFieldError(props.name)
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/colors' as colors;
@use '#nuxt-typo3/assets/styles/transition-durations' as transition-durations;

.t3-radio-group {
    margin: 0;

    &__values {
        display: flex;
    }

    &__error {
        color: colors.$error;
    }

    &--required & {
        &__label {
            &::after {
                content: '*';
            }
        }
    }

    .collapse-transition {
        &-enter-active,
        &-leave-active {
            transition: height transition-durations.$input-error;
        }
    }
}
</style>
