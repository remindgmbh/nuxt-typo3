<template>
    <T3BlDefault :content="content" :breadcrumbs="breadcrumbs" />
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    content: { [colPos: string]: T3Model.Typo3.Content.Element[] }
    breadcrumbs: T3Model.Typo3.Breadcrumb[]
}>()
</script>
