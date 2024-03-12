<template>
    <T3Textfield
        :default-value="formElement.defaultValue"
        :disabled="loading"
        :label="formElement.label"
        :name="formElement.name"
        :placeholder="placeholder"
        :required="required"
        type="password"
        :validation="validation"
    >
        <template #error="{ errorMessage }">
            <slot :error-message="errorMessage" name="error"></slot>
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
    props.formElement,
)
</script>
