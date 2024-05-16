<template>
    <template
        v-for="contentElement in contentElements"
        :key="contentElement.id"
    >
        <T3ContentWrapper :content-element="contentElement" />
    </template>
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'

withDefaults(
    defineProps<{
        contentElements?: T3Model.Typo3.Content.Element[]
    }>(),
    { contentElements: () => [] },
)
</script>
