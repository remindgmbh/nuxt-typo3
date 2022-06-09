<template>
    <div class="t3-ce-textpic">
        <T3CeTextmedia
            :id="id"
            :content="{
                ...content,
                assets: content.images,
                assetPosition: content.imagePosition,
            }"
        />
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    id: number
    content: Api.ContentTextpic
}>()
</script>

<style lang="scss">
.t3-ce-textmedia {
    display: flex;
    flex-wrap: wrap;

    &__asset {
        width: 50%;

        &--small {
            width: calc(1 / 3 * 100%);
        }

        &--right {
            order: 1;
        }

        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
            object-position: top;
        }
    }

    &__text {
        width: 50%;

        &--large {
            width: calc(2 / 3 * 100%);
        }
    }
}
</style>
