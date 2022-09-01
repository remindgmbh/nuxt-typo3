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
import { Api, useCeImageGallery } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.ImageGallery>
}>()

const { header, images, navigationImages, previewImages, type, subheader } =
    useCeImageGallery(props.contentElement.content)
</script>
