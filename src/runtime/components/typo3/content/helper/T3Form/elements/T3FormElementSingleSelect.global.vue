<template>
    <T3Select
        :default-value="formElement.defaultValue"
        :disabled="loading"
        :name="formElement.name"
        :options="selectOptions"
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
