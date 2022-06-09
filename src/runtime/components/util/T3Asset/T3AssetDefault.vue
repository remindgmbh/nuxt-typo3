<template>
    <pre>{{ file }}</pre>
</template>
<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{ file: Api.Asset }>()
</script>
