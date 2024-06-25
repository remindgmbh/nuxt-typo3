<template>
    <T3Textfield
        :default-value="formElement.defaultValue"
        :disabled="loading"
        :max="max"
        :min="min"
        :name="formElement.name"
        :placeholder="placeholder"
        :required="required"
        :step="step"
        type="number"
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

const step = computed(
    () => Number.parseInt(props.formElement.properties?.step ?? '') || 1,
)

const numberRangeValidator = computed(() =>
    props.formElement.validators?.find(
        (validator) => validator.identifier === 'NumberRange',
    ),
)

const min = computed(() =>
    Number.parseInt(numberRangeValidator.value?.options?.minimum ?? ''),
)
const max = computed(() =>
    Number.parseInt(numberRangeValidator.value?.options?.maximum ?? ''),
)
</script>
