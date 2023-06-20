<template>
    <div class="t3-bl-root">
        <T3Renderer :content-elements="pageData.content.colPos0" />
    </div>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    pageData: T3Model.Typo3.Page.Data
}>()
</script>
