<template>
    <T3FormElementTextfield
        :default-value="formElement.defaultValue"
        :disabled="loading"
        :error="apiError"
        :label="formElement.label"
        :loading="loading"
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
import { type Props } from '@remindgmbh/nuxt-typo3/components/typo3/content/helper/T3Form/T3FormFrameworkElement.vue'
import { computed } from 'vue'
import { useT3FormElement } from '#imports'

const props = defineProps<Props>()

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
