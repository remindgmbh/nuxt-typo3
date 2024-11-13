<template>
    <T3FileUpload
        :accept="accept"
        :default-value="formElement.defaultValue"
        :disabled="loading"
        :multiple="formElement.properties?.multiple"
        :name="formElement.name"
        :placeholder="placeholder"
        :required="required"
        :validation="validation"
    />
</template>

<script setup lang="ts">
import { type T3Model, useT3FormElement } from '#imports'
import { computed } from 'vue'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const { required, placeholder, validation } = useT3FormElement(
    props.formElement,
)

const accept = computed(() =>
    props.formElement.properties?.allowedMimeTypes?.join(','),
)
</script>
