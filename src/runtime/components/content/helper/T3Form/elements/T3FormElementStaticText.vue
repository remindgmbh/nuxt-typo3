<template>
    <T3FormStaticText :header="formElement.label" :text="text" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { T3Model } from '#imports'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const text = computed(() => props.formElement.properties?.text ?? '')
</script>
