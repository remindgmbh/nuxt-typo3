<template>
    <T3FormElement
        v-for="formElement in formElements"
        :key="formElement.name"
        :api-error="apiErrors?.[formElement.identifier]"
        :form-element="formElement"
        :loading="loading"
    >
        <template #error="{ errorMessage }">
            <slot :error-message="errorMessage" name="error"></slot>
        </template>
    </T3FormElement>
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'

defineProps<{
    apiErrors?: T3Model.Typo3.Content.Data.Form.Form['api']['errors']
    formElements: T3Model.Typo3.Content.Data.Form.FormElement[]
    loading?: boolean
}>()

defineOptions({
    inheritAttrs: false,
})
</script>
