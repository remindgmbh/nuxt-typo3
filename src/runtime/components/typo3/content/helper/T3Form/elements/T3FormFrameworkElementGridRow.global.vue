<template>
    <T3FormFrameworkElements
        :form-elements="childElements"
        :loading="loading"
    />
</template>

<script setup lang="ts">
import { type Props } from '@remindgmbh/nuxt-typo3/components/typo3/content/helper/T3Form/T3FormFrameworkElement.vue'
import { computed } from 'vue'

const props = defineProps<Props>()

const childElements = computed(() => props.formElement.elements ?? [])
</script>
