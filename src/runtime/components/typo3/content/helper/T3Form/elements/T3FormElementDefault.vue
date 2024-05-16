<template>
    <pre>{{ formElement }}</pre>
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'

defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
}>()
</script>
