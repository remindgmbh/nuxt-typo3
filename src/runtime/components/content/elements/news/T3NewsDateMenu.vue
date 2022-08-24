<template>
    <div class="t3-news-date-menu">
        <T3Header :content-element="contentElement" />
        <div class="t3-news-date-menu__links">
            <NuxtLink
                v-for="year in contentElement.content.data.years"
                :key="year.slug"
                :to="year.slug"
                class="t3-news-tags-list__link"
                >{{ year.title }} ({{ year.count }})</NuxtLink
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    contentElement: Api.ContentElement<Api.Content.NewsPiDateMenu>
}>()
</script>
