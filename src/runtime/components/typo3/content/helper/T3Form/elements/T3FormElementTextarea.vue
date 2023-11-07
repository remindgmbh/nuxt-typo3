<template>
    <component
        :is="Textarea"
        :name="formElement.name"
        :label="formElement.label"
        :default-value="formElement.defaultValue"
        :validation="validation"
        :placeholder="placeholder"
        :disabled="loading"
        :required="required"
    >
        <template #error="{ errorMessage }">
            <slot name="error" :error-message="errorMessage"></slot> </template
    ></component>
</template>

<script setup lang="ts">
import { T3Model, useT3FormElement, useT3DynamicComponent } from '#imports'
import { T3Textarea } from '#components'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const Textarea = useT3DynamicComponent<typeof T3Textarea>('Textarea')

const { required, placeholder, validation } = useT3FormElement(
    props.formElement
)
</script>
