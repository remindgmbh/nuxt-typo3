<template>
    <T3Select
        :name="formElement.name"
        :options="selectOptions"
        :label="formElement.label"
        :default-value="formElement.defaultValue"
        :validation="validation"
        :disabled="loading"
        :required="required"
    >
        <template #error="{ errorMessage }">
            <slot name="error" :error-message="errorMessage"></slot> </template
    ></T3Select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { T3Model, useT3FormElement } from '#imports'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const { required, options, validation } = useT3FormElement(props.formElement)

const selectOptions = computed<T3Model.Input.Select.Option[]>(() => {
    const result = Object.entries(options.value).map(([key, value]) => ({
        label: value,
        value: key,
    }))

    const emptyLabel = props.formElement.properties?.prependOptionLabel

    if (emptyLabel) {
        result.unshift({ label: emptyLabel, value: '' })
    }

    return result
})
</script>
