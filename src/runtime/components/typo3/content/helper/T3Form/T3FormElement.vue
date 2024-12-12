<template>
    <T3InputWrapper
        class="t3-form-element"
        :class="[
            `t3-form-element--${type}`,
            { [`t3-form-element--${size}`]: size },
        ]"
        :error="apiError"
        :hide-label="!showLabel"
        :label="formElement.label"
        :label-tag="labelTag"
        :loading="loading"
        :name="formElement.name"
        :required="required"
        :reverse-order="reverseOrder"
        :type="type"
        :wrapper-tag="wrapperTag"
    >
        <template #beforeLabel>
            <slot :form-element="formElement" name="beforeLabel"></slot>
        </template>
        <template #label="{ label }">
            <slot :label="label" name="label"></slot>
        </template>
        <template #afterLabel>
            <slot :form-element="formElement" name="afterLabel"></slot>
        </template>
        <template #input="{ errorAriaAttrs, cssClass }">
            <slot :form-element="formElement" name="beforeInput"></slot>
            <component
                :is="FormElement"
                :class="cssClass"
                :form-element="formElement"
                :loading="loading"
                v-bind="errorAriaAttrs"
            />
            <slot :form-element="formElement" name="afterInput"></slot>
        </template>
        <template #beforeError>
            <slot :form-element="formElement" name="beforeError"></slot>
        </template>
        <template #error="{ errorMessage }">
            <slot
                :error-message="errorMessage"
                :form-element="formElement"
                name="error"
            ></slot>
        </template>
        <template #errorMessage="{ errorMessage }">
            <slot
                :error-message="errorMessage"
                :form-element="formElement"
                name="errorMessage"
            ></slot>
        </template>
        <template #afterError>
            <slot :form-element="formElement" name="afterError"></slot>
        </template>
    </T3InputWrapper>
</template>

<script setup lang="ts">
import {
    type T3Model,
    useAppConfig,
    useT3DynamicComponent,
    useT3FormElement,
} from '#imports'
import { T3FormElementDefault } from '#components'
import { computed } from 'vue'
import { kebabCase } from 'scule'

export interface Props {
    apiError?: string
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}

const props = defineProps<Props>()

const { typo3: config } = useAppConfig()

const reverseOrder = computed(() =>
    config.form.reverseOrder?.includes(props.formElement.type),
)

const wrapperTag = computed(
    () =>
        (Object.keys(config.form.wrapper ?? {}).find((tag) =>
            config.form.wrapper?.[tag].includes(props.formElement.type),
        ) as keyof HTMLElementTagNameMap) ?? 'div',
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

const size = computed(() => props.formElement.properties?.size)
const type = computed(() => kebabCase(props.formElement.type))

const FormElement = useT3DynamicComponent(
    props.formElement.type,
    'FormElement',
    T3FormElementDefault,
)

const { required } = useT3FormElement(props.formElement)
</script>

<style lang="scss">
.t3-form-element {
    &--honeypot,
    &--hidden {
        display: none !important;
    }
}
</style>
