<template>
    <div class="t3-ce-image">
        <T3Header
            class="t3-ce-image__header"
            :content="contentElement.content"
        />
        <T3Asset v-if="image" :file="image" />
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3CeImage, useT3Content } from '#imports'

const { injectContentElement } = useT3Content()

const contentElement = injectContentElement<T3Model.Typo3.Content.Data.Image>()

const { image } = useT3CeImage(contentElement)
</script>

<style lang="scss">
.t3-ce-image {
    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        display: block;
    }
}
</style>
