<template>
    <pre>{{ file }}</pre>
</template>
<script setup lang="ts">
import { T3Api } from '#imports'

defineProps<{ file: T3Api.Asset }>()
</script>
