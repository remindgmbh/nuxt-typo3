<template>
    <div class="t3-bl-root">
        <T3Col :content-elements="pageData.content.colPos0" />
    </div>
</template>

<script setup lang="ts">
import type { T3Model } from '#imports'

export interface Props {
    pageData: T3Model.Typo3.Page
}

defineProps<Props>()
</script>
