<template>
    <div class="t3-text">
        <T3Header :content="content" />
        <T3HtmlParser :content="content.bodytext" />
    </div>
</template>

<script setup lang="ts">
import type { T3Model } from '#imports'

export interface Props {
    content: T3Model.Typo3.Content.Data.Text
}

defineProps<Props>()
</script>
