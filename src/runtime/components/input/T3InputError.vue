<template>
    <T3CollapseTransition transition-name="error-transition">
        <div v-if="errorMessage" class="t3-input-error">
            {{ errorMessage }}
        </div>
    </T3CollapseTransition>
</template>

<script setup lang="ts">
defineProps<{
    errorMessage?: string
}>()
</script>
