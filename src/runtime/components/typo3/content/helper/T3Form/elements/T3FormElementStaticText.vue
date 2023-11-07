<template>
    <component :is="FormStaticText" :header="formElement.label" :text="text" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { T3Model, useT3DynamicComponent } from '#imports'
import { T3FormStaticText } from '#components'

const props = defineProps<{
    formElement: T3Model.Typo3.Content.Data.Form.FormElement
    loading?: boolean
}>()

const FormStaticText =
    useT3DynamicComponent<typeof T3FormStaticText>('FormStaticText')

const text = computed(() => props.formElement.properties?.text ?? '')
</script>
