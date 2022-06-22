<template>
    <fieldset class="t3-checkbox-group">
        <legend class="t3-checkbox-group__label">{{ label }}</legend>
        <div class="t3-checkbox-group__values">
            <T3Checkbox
                v-for="(optionLabel, optionValue) in options"
                :key="optionValue"
                :value="optionValue.toString()"
                :name="name"
                :default-value="defaultValue"
                :label="optionLabel"
                :validation="validation"
                multi
            />
        </div>
        <T3CollapseTransition>
            <div v-if="errorMessage" class="t3-checkbox-group__error">
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
    defaultValue?: string[]
    validation?: yup.Schema
}>()

const errorMessage = useFieldError(props.name)
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

.t3-checkbox-group {
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
