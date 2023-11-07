<template>
    <component
        :is="CheckboxGroup"
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
    ></component>
</template>

<script setup lang="ts">
import { T3Model, useT3FormElement, useT3DynamicComponent } from '#imports'
import { T3CheckboxGroup } from '#components'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const CheckboxGroup =
    useT3DynamicComponent<typeof T3CheckboxGroup>('CheckboxGroup')

const { required, options, validation } = useT3FormElement(props.formElement)
</script>
