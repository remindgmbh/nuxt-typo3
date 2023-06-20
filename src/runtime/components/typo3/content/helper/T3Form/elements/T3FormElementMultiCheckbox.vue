<template>
    <T3CheckboxGroup
        :name="formElement.name"
        :options="options"
        :label="formElement.label"
        :default-value="formElement.defaultValue || []"
        :validation="validation"
        :disabled="loading"
        :required="required"
    >
        <template #error="{ errorMessage }">
            <slot name="error" :error-message="errorMessage"></slot> </template
    ></T3CheckboxGroup>
</template>

<script setup lang="ts">
import { T3Model, useT3FormElement } from '#imports'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const { required, options, validation } = useT3FormElement(props.formElement)
</script>
