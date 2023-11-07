<template>
    <div class="ce-image">
        <component
            :is="Header"
            class="ce-image__header"
            :content="contentElement.content"
        />
        <T3Asset v-if="image" :file="image" />
    </div>
</template>

<script setup lang="ts">
import {
    T3Model,
    useT3CeImage,
    useT3Content,
    useT3DynamicComponent,
} from '#imports'
import { T3Header } from '#components'

const { injectContentElement } = useT3Content()

const contentElement = injectContentElement<T3Model.Typo3.Content.Data.Image>()

const Header = useT3DynamicComponent<typeof T3Header>('Header')

const { image } = useT3CeImage(contentElement)
</script>

<style lang="scss">
.ce-image {
    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        display: block;
    }
}
</style>
