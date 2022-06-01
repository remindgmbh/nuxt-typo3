<template>
    <div class="t3-page-error container">{{ message }}</div>
</template>

<script setup lang="ts">
import { FetchResponse } from 'ohmyfetch'

defineProps<{
    message: string
    response?: FetchResponse<any>
}>()
</script>
