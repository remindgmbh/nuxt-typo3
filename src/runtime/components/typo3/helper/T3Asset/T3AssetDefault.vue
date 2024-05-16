<template>
    <pre>{{ file }}</pre>
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'

defineProps<{ file: T3Model.Typo3.Asset }>()
</script>
