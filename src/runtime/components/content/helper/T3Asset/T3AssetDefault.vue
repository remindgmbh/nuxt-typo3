<template>
    <pre>{{ file }}</pre>
</template>
<script setup lang="ts">
import { T3Api } from '#nuxt-typo3'

defineProps<{ file: T3Api.Asset }>()
</script>
