<template>
    <div class="t3-news-tags-list">
        <T3Header :content-element="contentElement" />
        <div class="t3-news-tags-list__links">
            <NuxtLink
                v-for="tag in contentElement.content.data.tags"
                :key="tag.slug"
                :to="tag.slug"
                class="t3-news-tags-list__link"
                >{{ tag.title }} ({{ tag.count }})</NuxtLink
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    contentElement: Api.ContentElement<Api.Content.NewsPiTagsList>
}>()
</script>
