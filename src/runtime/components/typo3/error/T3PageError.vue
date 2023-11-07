<template>
    <div class="page-error container">
        <div v-if="error.status" class="page-error__status">
            {{ error.status }}
        </div>
        <div v-if="error.statusText" class="page-error__status-text">
            {{ error.statusText }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{ error: T3Model.Typo3.Page.Error }>()
</script>
