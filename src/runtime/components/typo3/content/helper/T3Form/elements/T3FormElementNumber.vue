<template>
    <T3Textfield
        :name="formElement.name"
        :label="formElement.label"
        :default-value="formElement.defaultValue"
        :validation="validation"
        type="number"
        :placeholder="placeholder"
        :disabled="loading"
        :step="step"
        :min="min"
        :max="max"
        :required="required"
    >
        <template #error="{ errorMessage }">
            <slot name="error" :error-message="errorMessage"></slot>
        </template>
    </T3Textfield>
</template>

<script setup lang="ts">
import { T3Model, useT3FormElement } from '#imports'
import { computed } from 'vue'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const { required, placeholder, validation } = useT3FormElement(
    props.formElement,
)

const step = computed(
    () =>
        Number.parseInt(
            props.formElement.properties?.fluidAdditionalAttributes?.step ?? '',
        ) || 1,
)

const min = computed(() =>
    Number.parseInt(
        props.formElement.properties?.fluidAdditionalAttributes?.min ?? '',
    ),
)
const max = computed(() =>
    Number.parseInt(
        props.formElement.properties?.fluidAdditionalAttributes?.max ?? '',
    ),
)
</script>
