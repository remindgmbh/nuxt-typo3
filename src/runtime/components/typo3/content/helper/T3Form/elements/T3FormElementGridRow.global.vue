<template>
    <T3FormElements :form-elements="childElements" :loading="loading" />
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'
import { computed } from 'vue'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const childElements = computed(() => props.formElement.elements ?? [])
</script>
