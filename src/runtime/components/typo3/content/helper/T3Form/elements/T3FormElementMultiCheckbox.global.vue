<template>
    <T3CheckboxGroup
        :default-value="formElement.defaultValue || []"
        :disabled="loading"
        :name="formElement.name"
        :options="options"
        :validation="validation"
    />
</template>

<script setup lang="ts">
import { type T3Model, useT3FormElement } from '#imports'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const { options, validation } = useT3FormElement(props.formElement)
</script>
