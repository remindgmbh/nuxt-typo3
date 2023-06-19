<template>
    <T3Textfield
        :name="formElement.name"
        :label="formElement.label"
        :default-value="formElement.defaultValue"
        :validation="validation"
        type="tel"
        :placeholder="placeholder"
        :disabled="loading"
        :required="required"
    >
        <template #error="{ errorMessage }">
            <slot name="error" :error-message="errorMessage"></slot>
        </template>
    </T3Textfield>
</template>

<script setup lang="ts">
import { T3Model, useT3FormElement } from '#imports'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const { required, placeholder, validation } = useT3FormElement(
    props.formElement
)
</script>
