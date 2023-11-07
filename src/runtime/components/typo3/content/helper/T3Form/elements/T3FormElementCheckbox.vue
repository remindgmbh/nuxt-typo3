<template>
    <component
        :is="Checkbox"
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
    </component>
</template>

<script setup lang="ts">
import { T3Model, useT3FormElement, useT3DynamicComponent } from '#imports'
import { T3Checkbox } from '#components'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const Checkbox = useT3DynamicComponent<typeof T3Checkbox>('Checkbox')

const { required, validation } = useT3FormElement(props.formElement)
</script>
