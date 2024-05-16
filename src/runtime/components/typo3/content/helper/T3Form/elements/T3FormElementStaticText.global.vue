<template>
    <T3FormStaticText :header="formElement.label" :text="text" />
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'
import { computed } from 'vue'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
}>()

const text = computed(() => props.formElement.properties?.text ?? '')
</script>
