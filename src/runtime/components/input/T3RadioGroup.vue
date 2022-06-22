<template>
    <fieldset class="t3-radio-group">
        <legend class="t3-radio-group__label">{{ label }}</legend>
        <div class="t3-radio-group__values">
            <T3Radio
                v-for="(optionLabel, optionValue) in options"
                :key="optionValue"
                :name="name"
                :label="optionLabel"
                :default-value="defaultValue"
                :value="optionValue.toString()"
                :validation="validation"
            />
        </div>
        <T3CollapseTransition>
            <div v-if="errorMessage" class="t3-radio-group__error">
                {{ errorMessage }}
            </div>
        </T3CollapseTransition>
    </fieldset>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useFieldError } from 'vee-validate'

const props = defineProps<{
    name: string
    label?: string
    options: { [key: string]: string }
    defaultValue?: string
    validation?: yup.Schema
}>()

const errorMessage = useFieldError(props.name)
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

.t3-radio-group {
    margin: 0;

    &__values {
        display: flex;
    }

    &__error {
        color: $color-error;
    }

    .collapse-transition {
        &-enter-active,
        &-leave-active {
            transition: height $transition-duration-input-error;
        }
    }
}
</style>
