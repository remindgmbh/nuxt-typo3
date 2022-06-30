<template>
    <div class="t3-news-list-element">
        <NuxtLink class="t3-news-list-element__image" :to="listElement.slug">
            <T3NewsImage
                v-if="image && mediaProperties"
                :image="image"
                :properties="mediaProperties"
            />
        </NuxtLink>
        <div class="t3-news-list-element__text">
            <NuxtLink
                class="t3-news-list-element__header"
                :to="listElement.slug"
                >{{ listElement.title }}</NuxtLink
            >
            <div class="t3-news-list-element__teaser">
                {{ listElement.teaser }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Api, useNewsElement } from '#nuxt-typo3'

const props = defineProps<{
    listElement: Api.Content.News.ListElement
}>()

const { listViewImage: image, mediaProperties } = useNewsElement(
    props.listElement
)
</script>

<style lang="scss">
.t3-news-list-element {
    display: flex;

    &__image {
        width: 25%;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    &__text {
        width: 75%;
    }
}
</style>
