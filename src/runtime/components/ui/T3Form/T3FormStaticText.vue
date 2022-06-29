<template>
    <div class="t3-form-static-text">
        <div v-if="header" class="t3-form-static-text__header">
            {{ header }}
        </div>
        <div v-if="text" class="t3-form-static-text__text">{{ text }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    header?: string
    text?: string
}>()
</script>
