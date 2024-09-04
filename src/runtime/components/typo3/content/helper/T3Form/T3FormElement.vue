<template>
    <component
        :is="wrapperTag"
        aria-live="polite"
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
        <T3Sortable :order="order">
            <template v-if="showLabel" #[LABEL]>
                <component
                    :is="labelTag"
                    class="t3-form-element__label"
                    :for="formElement.name"
                >
                    <slot :label="formElement.label" name="label">
                        <T3HtmlParser :content="formElement.label" tag="span" />
                        <span
                            v-if="required"
                            aria-hidden="true"
                            class="t3-form-element__required-hint"
                            >*</span
                        >
                    </slot>
                </component>
            </template>
            <template #[INPUT]>
                <component
                    :is="FormElement"
                    class="t3-form-element__input"
                    :form-element="formElement"
                    :loading="loading"
                    v-bind="ariaAttrs"
                />
            </template>
        </T3Sortable>
        <slot :error-message="errorMessage" name="error">
            <T3CollapseTransition transition-name="error-transition">
                <span
                    v-show="errorMessage"
                    :id="errorMessageId"
                    class="t3-form-element__error"
                >
                    <!-- use lastErrorMessage because with v-show errorMessage is not available during transition leave  -->
                    <slot :error-message="lastErrorMessage" name="errorMessage">
                        {{ lastErrorMessage }}
                    </slot>
                </span>
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
import { computed, inject, ref, toValue, watch } from 'vue'
import { FormContextKey } from 'vee-validate'
import { T3FormElementDefault } from '#components'
import { kebabCase } from 'scule'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const LABEL = 'label'
const INPUT = 'input'

const config = useT3Config()

const order = computed(() => {
    const result = [LABEL, INPUT]
    return config.form.reverseOrder?.includes(props.formElement.type)
        ? result.reverse()
        : result
})

const wrapperTag = computed(
    () =>
        Object.keys(config.form.wrapper ?? {}).find((tag) =>
            config.form.wrapper?.[tag].includes(props.formElement.type),
        ) ?? 'div',
)

const labelTag = computed(() =>
    config.form.wrapper?.fieldset.includes(props.formElement.type)
        ? 'legend'
        : wrapperTag.value === 'label'
          ? 'span'
          : 'label',
)

const showLabel = computed(
    () =>
        props.formElement.label &&
        !config.form.hideLabel?.includes(props.formElement.type),
)

const errorMessageId = computed(() => `${props.formElement.name}-error`)

const ariaAttrs = computed(() =>
    props.formElement.validators?.length
        ? {
              'aria-errormessage': errorMessageId.value,
              'aria-invalid': !!errorMessage.value,
          }
        : undefined,
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

const lastErrorMessage = ref<string>()

watch(errorMessage, (value) => {
    if (value) {
        lastErrorMessage.value = value
    }
})
</script>

<style lang="scss">
.t3-form-element {
    &--honeypot,
    &--hidden {
        display: none !important;
    }
}
</style>
