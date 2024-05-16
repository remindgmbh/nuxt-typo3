<template>
    <T3FormElementHidden :form-element="formElement" />
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'

defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
}>()
</script>
