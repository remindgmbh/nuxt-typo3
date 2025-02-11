<template>
    <T3FormElementRadioButton
        :default-value="formElement.defaultValue"
        :disabled="loading"
        :error="apiError"
        :label="formElement.label"
        :loading="loading"
        :name="formElement.name"
        :options="options"
        :required="required"
        :validation="validation"
    />
</template>

<script setup lang="ts">
import { type Props } from '@remindgmbh/nuxt-typo3/components/typo3/content/helper/T3Form/T3FormFrameworkElement.vue'
import { useT3FormElement } from '#imports'

const props = defineProps<Props>()

const { required, options, validation } = useT3FormElement(props.formElement)
</script>
