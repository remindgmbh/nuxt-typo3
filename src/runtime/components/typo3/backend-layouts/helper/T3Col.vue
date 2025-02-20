<template>
    <template
        v-for="contentElement in contentElements"
        :key="contentElement.id"
    >
        <T3ContentWrapper :content-element="contentElement" />
    </template>
</template>

<script setup lang="ts">
import type { T3Model } from '#imports'

export interface Props {
    contentElements?: T3Model.Typo3.Content.Element[]
}

withDefaults(defineProps<Props>(), { contentElements: () => [] })
</script>
