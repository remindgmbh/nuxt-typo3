<template>
    <T3FormFrameworkElementHidden :form-element="formElement" />
</template>

<script setup lang="ts">
import type { Props } from '@remindgmbh/nuxt-typo3/components/typo3/content/helper/T3Form/T3FormFrameworkElement.vue'

defineProps<Props>()
</script>
