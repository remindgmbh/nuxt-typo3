<template>
    <component
        :is="wrapperTag"
        aria-live="polite"
        class="t3-form-element"
        :class="{
            't3-form-element--required': required,
            't3-form-element--disabled': loading,
            't3-form-element--error': touched && !valid,
            't3-form-element--success': touched && valid,
        }"
    >
        <T3Sortable :order="order">
            <template v-if="!hideLabel" #[LABEL]>
                <slot name="beforeLabel"></slot>
                <component
                    :is="labelTag"
                    class="t3-form-element__label"
                    :for="name"
                >
                    <slot :label="label" name="label">
                        <T3HtmlParser :content="label" tag="span" />
                        <span
                            v-if="required"
                            aria-hidden="true"
                            class="t3-form-element__required-hint"
                            >*</span
                        >
                    </slot>
                </component>
                <slot name="afterLabel"></slot>
            </template>
            <template #[INPUT]>
                <slot
                    css-class="t3-form-element__input"
                    :error-aria-attrs="errorAriaAttrs"
                    name="input"
                ></slot>
            </template>
        </T3Sortable>
        <slot name="beforeError"></slot>
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
        <slot name="afterError"></slot>
    </component>
</template>

<script setup lang="ts">
import { computed, inject, ref, toValue, watch } from 'vue'
import { FormContextKey } from 'vee-validate'

export interface FormElementProps {
    error?: string
    label: string
    loading?: boolean
    name: string
    required?: boolean
}

interface ConfigurationProps {
    hideLabel?: boolean
    labelTag?: 'legend' | 'span' | 'label'
    reverseOrder?: boolean
    wrapperTag?: keyof HTMLElementTagNameMap
}

export type Props = FormElementProps & ConfigurationProps

const props = withDefaults(defineProps<Props>(), {
    error: undefined,
    labelTag: 'label',
    type: undefined,
    wrapperTag: 'div',
})

const LABEL = 'label'
const INPUT = 'input'

const order = computed(() => {
    const result = [LABEL, INPUT]
    return props.reverseOrder ? result.reverse() : result
})

const errorMessageId = computed(() => `${props.name}-error`)

// inject form manually because useIsFieldTouched and useIsFieldValid throw a warning because state?.value is initially undefined
const form = inject(FormContextKey, undefined)
const state = computed(() => form?.getPathState(toValue(() => props.name)))

const touched = computed(() => state.value?.touched)
const valid = computed(() => state.value?.valid)
const errorMessage = computed(
    () => form?.errors.value[toValue(() => props.name)],
)

const lastErrorMessage = ref<string>()

const errorAriaAttrs = computed(() => ({
    'aria-errormessage': errorMessageId.value,
    'aria-invalid': !!errorMessage.value,
}))

watch(errorMessage, (value) => {
    if (value) {
        lastErrorMessage.value = value
    }
})

watch(
    () => props.error,
    (value) => {
        if (value) {
            form?.resetField(props.name, { errors: [value] })
        }
    },
)
</script>
