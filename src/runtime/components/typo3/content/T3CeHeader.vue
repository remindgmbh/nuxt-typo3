<template>
    <div class="t3-ce-header">
        <T3Header :content="contentElement.content" />
    </div>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Header>
}>()
</script>
