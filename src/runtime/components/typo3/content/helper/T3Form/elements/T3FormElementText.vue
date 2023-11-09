<template>
    <component
        :is="Textfield"
        :name="formElement.name"
        :label="formElement.label"
        :default-value="formElement.defaultValue"
        :validation="validation"
        type="text"
        :placeholder="placeholder"
        :disabled="loading"
        :required="required"
    >
        <template #error="{ errorMessage }">
            <slot name="error" :error-message="errorMessage"></slot>
        </template>
    </component>
</template>

<script setup lang="ts">
import { T3Textfield } from '#components'
import { T3Model, useT3FormElement, useT3DynamicComponent } from '#imports'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const Textfield = useT3DynamicComponent<typeof T3Textfield>('Textfield')

const { required, placeholder, validation } = useT3FormElement(
    props.formElement,
)
</script>
