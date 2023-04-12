<template>
    <div
        class="t3-ce-image"
        :class="{
            [`t3-ce-image--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Header :content-element="contentElement" />
        <T3Asset v-if="image" :file="image" :asset-attrs="imageAttrs" />
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3CeImage } from '#imports'

const props = defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Image>
}>()

const { image, imageAttrs } = useT3CeImage(props.contentElement)
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
