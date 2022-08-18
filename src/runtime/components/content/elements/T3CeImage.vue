<template>
    <div
        class="t3-ce-image"
        :class="{
            [`t3-ce-image--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Header :content-element="contentElement" />
        <T3Asset v-if="image" :file="image" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Api } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Image>
}>()

const image = computed(() => props.contentElement.content.images.at(0))
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
