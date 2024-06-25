<template>
    <component
        :is="fieldset ? 'fieldset' : 'div'"
        class="t3-form-element"
        :class="[
            `t3-form-element--${type}`,
            {
                [`t3-form-element--${size}`]: size,
                't3-form-element--required': required,
                't3-form-element--disabled': loading,
                't3-form-element--error': touched && !valid,
                't3-form-element--success': touched && valid,
            },
        ]"
    >
        <component
            :is="fieldset ? 'legend' : 'label'"
            v-if="!hideLabel && formElement.label"
            class="t3-form-element__label"
            :for="formElement.name"
            >{{ formElement.label }}</component
        >
        <component
            :is="FormElement"
            class="t3-form-element__input"
            :form-element="formElement"
            :loading="loading"
        />
        <slot :error-message="errorMessage" name="error">
            <T3CollapseTransition transition-name="error-transition">
                <div v-if="errorMessage" class="t3-form-element__error">
                    {{ errorMessage }}
                </div>
            </T3CollapseTransition>
        </slot>
    </component>
</template>

<script setup lang="ts">
import {
    type T3Model,
    useT3Config,
    useT3DynamicComponent,
    useT3FormElement,
} from '#imports'
import { computed, inject, toValue } from 'vue'
import { FormContextKey } from 'vee-validate'
import { T3FormElementDefault } from '#components'
import { kebabCase } from 'scule'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const config = useT3Config()

const fieldset = computed(() =>
    config.form.fieldset?.includes(props.formElement.type),
)

const hideLabel = computed(() =>
    config.form.hideLabel?.includes(props.formElement.type),
)

const size = computed(() => props.formElement.properties?.size)
const type = computed(() => kebabCase(props.formElement.type))

const FormElement = useT3DynamicComponent(
    props.formElement.type,
    'FormElement',
    T3FormElementDefault,
)

const { required } = useT3FormElement(props.formElement)

// inject form manually because useIsFieldTouched and useIsFieldValid throw a warning because state?.value is initially undefined
const form = inject(FormContextKey)
const state = computed(() =>
    form?.getPathState(toValue(() => props.formElement.name)),
)

const touched = computed(() => state.value?.touched)
const valid = computed(() => state.value?.valid)
const errorMessage = computed(
    () => form?.errors.value[toValue(() => props.formElement.name)],
)
</script>

<style lang="scss">
.t3-form-element {
    &--honeypot,
    &--hidden {
        display: none !important;
    }
}
</style>
