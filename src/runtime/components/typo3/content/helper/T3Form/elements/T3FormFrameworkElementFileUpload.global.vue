<template>
    <T3FormElementFileUpload
        :disabled="loading"
        :error="apiError"
        :label="formElement.label"
        :loading="loading"
        :mime-types="formElement.properties?.allowedMimeTypes"
        :multiple="!!formElement.properties?.multiple"
        :name="formElement.name"
        :placeholder="placeholder"
        :required="required"
        :validation="validation"
    />
</template>

<script setup lang="ts">
import type { Props } from '@remindgmbh/nuxt-typo3/components/typo3/content/helper/T3Form/T3FormFrameworkElement.vue'
import { useT3FormElement } from '#imports'

const props = defineProps<Props>()

const { required, placeholder, validation } = useT3FormElement(
    props.formElement,
)
</script>
