<template>
    <div class="t3-ce-image-gallery">
        <T3Header :content="contentElement.content" />
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
import { T3Model, useT3CeImageGallery } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.ImageGallery>
}>()

const { header, images, navigationImages, previewImages, type, subheader } =
    useT3CeImageGallery(props.contentElement.content)
</script>
