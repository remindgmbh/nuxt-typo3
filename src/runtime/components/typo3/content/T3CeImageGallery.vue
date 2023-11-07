<template>
    <div class="ce-image-gallery">
        <component
            :is="Header"
            class="ce-image-gallery__header"
            :content="contentElement.content"
        />
        <component
            :is="ImageGallery"
            :header="contentElement.content.header"
            :images="contentElement.content.images"
            :subheader="contentElement.content.subheader"
            :type="contentElement.content.settings.type"
        />
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3Content, useT3DynamicComponent } from '#imports'
import { T3Header, T3ImageGallery } from '#components'

const { injectContentElement } = useT3Content()

const contentElement =
    injectContentElement<T3Model.Typo3.Content.Data.ImageGallery>()

const Header = useT3DynamicComponent<typeof T3Header>('Header')
const ImageGallery =
    useT3DynamicComponent<typeof T3ImageGallery>('ImageGallery')
</script>
