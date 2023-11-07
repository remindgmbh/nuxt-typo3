<template>
    <div class="form-static-text">
        <div v-if="header" class="form-static-text__header">
            {{ header }}
        </div>
        <div v-if="text" class="form-static-text__text">{{ text }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    header?: string
    text?: string
}>()
</script>
