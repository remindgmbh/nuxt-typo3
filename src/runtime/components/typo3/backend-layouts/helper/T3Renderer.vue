<template>
    <template
        v-for="contentElement in contentElements"
        :key="contentElement.id"
    >
        <T3Background
            v-if="contentElement.appearance.backgroundColor"
            :content-element="contentElement"
        >
            <T3Content :content-element="contentElement" />
        </T3Background>
        <T3Content v-else :content-element="contentElement" />
    </template>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

withDefaults(
    defineProps<{
        contentElements?: T3Model.Typo3.Content.Element[]
    }>(),
    { contentElements: () => [] }
)
</script>
