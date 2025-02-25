<template>
    <T3FormFrameworkElement
        v-for="formElement in formElements"
        :key="formElement.name"
        :api-error="apiErrors?.[formElement.identifier]"
        :form-element="formElement"
        :loading="loading"
    />
</template>

<script setup lang="ts">
import type { T3Model } from '#imports'

export interface Props {
    apiErrors?: T3Model.Typo3.Content.Data.Form.Form['api']['errors']
    formElements: T3Model.Typo3.Content.Data.Form.FormElement[]
    loading?: boolean
}

defineProps<Props>()

defineOptions({
    inheritAttrs: false,
})
</script>
