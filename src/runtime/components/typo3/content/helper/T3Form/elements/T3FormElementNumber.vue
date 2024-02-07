<template>
    <T3Textfield
        :default-value="formElement.defaultValue"
        :disabled="loading"
        :label="formElement.label"
        :max="max"
        :min="min"
        :name="formElement.name"
        :placeholder="placeholder"
        :required="required"
        :step="step"
        type="number"
        :validation="validation"
    >
        <template #error="{ errorMessage }">
            <slot :error-message="errorMessage" name="error"></slot>
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
