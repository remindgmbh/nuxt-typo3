<template>
    <div class="t3-ce-image-gallery">
        <T3Header
            class="t3-ce-image-gallery__header"
            :content="contentElement.content"
        />
        <T3ImageGallery
            :header="contentElement.content.header"
            :images="contentElement.content.images"
            :subheader="contentElement.content.subheader"
            :type="contentElement.content.settings.type"
        />
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3Content } from '#imports'

const { injectContentElement } = useT3Content()

const contentElement =
    injectContentElement<T3Model.Typo3.Content.Data.ImageGallery>()
</script>
