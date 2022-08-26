<template>
    <div class="t3-news-category-menu">
        <T3Header :content-element="contentElement" />
        <div class="t3-news-category-menu__links">
            <NuxtLink
                v-for="category in contentElement.content.data.categories"
                :key="category.slug"
                :to="category.slug"
                class="t3-news-category-menu__link"
                >{{ category.title }}</NuxtLink
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    contentElement: Api.ContentElement<Api.Content.NewsPiCategoryMenu>
}>()
</script>
