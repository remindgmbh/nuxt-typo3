<template>
    <T3Textfield
        :default-value="formElement.defaultValue"
        :disabled="loading"
        :name="formElement.name"
        :placeholder="placeholder"
        :required="required"
        type="tel"
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
