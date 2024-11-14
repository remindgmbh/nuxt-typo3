<template>
    <T3FileUpload
        :disabled="loading"
        :mime-types="formElement.properties?.allowedMimeTypes"
        :multiple="formElement.properties?.multiple"
        :name="formElement.name"
        :placeholder="placeholder"
        :required="required"
        :validation="validation"
    />
</template>

<script setup lang="ts">
import { type T3Model, useT3FormElement } from '#imports'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const { required, placeholder, validation } = useT3FormElement(
    props.formElement,
)
</script>
