<template>
    <T3FormElementSelect
        :default-value="formElement.defaultValue"
        :disabled="loading"
        :error="apiError"
        :label="formElement.label"
        :loading="loading"
        :name="formElement.name"
        :options="selectOptions"
        :required="required"
        :validation="validation"
    />
</template>

<script setup lang="ts">
import { type T3Model, useT3FormElement } from '#imports'
import { type Props } from '@remindgmbh/nuxt-typo3/components/typo3/content/helper/T3Form/T3FormFrameworkElement.vue'
import { computed } from 'vue'

const props = defineProps<Props>()

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
