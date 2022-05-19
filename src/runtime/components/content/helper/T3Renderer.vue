<template>
    <template
        v-for="contentElement in contentElements"
        :key="contentElement.id"
    >
        <T3Background
            v-if="contentElement.appearance.backgroundColor"
            :appearance="contentElement.appearance"
            :type="contentElement.type"
        >
            <T3Content
                :id="contentElement.id"
                :type="contentElement.type"
                :content="contentElement.content"
                :appearance="contentElement.appearance"
            />
        </T3Background>
        <T3Content
            v-else
            :id="contentElement.id"
            :type="contentElement.type"
            :content="contentElement.content"
            :appearance="contentElement.appearance"
        />
    </template>
</template>

<script setup lang="ts">
import { ContentElement } from '#nuxt-typo3/api'

withDefaults(
    defineProps<{
        contentElements?: ContentElement[]
    }>(),
    { contentElements: () => [] }
)
</script>
