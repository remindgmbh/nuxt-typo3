<template>
    <div class="t3-news-detail">
        <h1 class="t3-news-detail__title">{{ element.title }}</h1>
        <h2 class="t3-news-detail__teaser">{{ element.teaser }}</h2>
        <template v-if="image && mediaProperties">
            <NuxtLink
                v-if="mediaProperties.link"
                class="t3-news-detail__image"
                :to="mediaProperties.link"
            >
                <T3NewsImage :image="image" :properties="mediaProperties" />
            </NuxtLink>
            <div v-else class="t3-news-detail__image">
                <T3NewsImage :image="image" :properties="mediaProperties" />
            </div>
        </template>
        <T3HtmlParser
            class="t3-news-detail__text"
            :content="element.bodytext"
        />
    </div>
</template>

<script setup lang="ts">
import { Api, useNewsElement } from '#nuxt-typo3'

const props = defineProps<{
    element: Api.Content.News.DetailElement
}>()

const { detailViewImage: image, mediaProperties } = useNewsElement(
    props.element
)
</script>

<style lang="scss">
.t3-news-detail {
    &__title {
        margin: inherit;
    }

    &__teaser {
        margin: inherit;
    }

    &__image {
        display: block;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    }
}
</style>
