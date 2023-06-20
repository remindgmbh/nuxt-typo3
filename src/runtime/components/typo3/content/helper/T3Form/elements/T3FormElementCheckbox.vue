<template>
    <T3Checkbox
        :name="formElement.name"
        :label="formElement.label ?? formElement.name"
        :default-value="
            formElement.defaultValue ? formElement.defaultValue : false
        "
        :validation="validation"
        :disabled="loading"
        :required="required"
    >
        <template #error="{ errorMessage }">
            <slot name="error" :error-message="errorMessage"></slot>
        </template>
    </T3Checkbox>
</template>

<script setup lang="ts">
import { T3Model, useT3FormElement } from '#imports'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const { required, validation } = useT3FormElement(props.formElement)
</script>
