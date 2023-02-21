<template>
    <div
        class="t3-ce-image-gallery"
        :class="{
            [`t3-ce-image-gallery--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Header :content-element="contentElement" />
        <T3ImageGallery
            :header="header"
            :images="images"
            :navigation-images="navigationImages"
            :preview-images="previewImages"
            :subheader="subheader"
            :type="type"
        />
    </div>
</template>

<script setup lang="ts">
import { T3Api } from '#nuxt-typo3'
import { useT3CeImageGallery } from '#nuxt-typo3/composables/content/useT3CeImageGallery'

const props = defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.ImageGallery>
}>()

const { header, images, navigationImages, previewImages, type, subheader } =
    useT3CeImageGallery(props.contentElement.content)
</script>
