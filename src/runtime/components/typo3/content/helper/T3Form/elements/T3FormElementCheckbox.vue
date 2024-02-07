<template>
    <T3Checkbox
        :default-value="
            formElement.defaultValue ? formElement.defaultValue : false
        "
        :disabled="loading"
        :label="formElement.label ?? formElement.name"
        :name="formElement.name"
        :required="required"
        :validation="validation"
    >
        <template #error="{ errorMessage }">
            <slot :error-message="errorMessage" name="error"></slot>
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
