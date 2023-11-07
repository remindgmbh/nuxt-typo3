<template>
    <div class="bl-root">
        <T3Col :content-elements="pageData.content.colPos0" />
    </div>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    pageData: T3Model.Typo3.Page.Data
}>()
</script>
