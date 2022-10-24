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
import { T3Api } from '#nuxt-typo3'

withDefaults(
    defineProps<{
        contentElements?: T3Api.ContentElement[]
    }>(),
    { contentElements: () => [] }
)
</script>
