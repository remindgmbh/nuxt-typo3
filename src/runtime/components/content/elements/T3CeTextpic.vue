<template>
    <div
        class="t3-ce-textpic"
        :class="{
            [`t3-ce-textpic--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3CeTextmedia :content-element="contentElement" />
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Textpic>
}>()

const contentElement: Api.ContentElement<Api.Content.Textmedia> = {
    ...props.contentElement,
    content: {
        ...props.contentElement.content,
        assetPosition: props.contentElement.content.imagePosition,
        assets: props.contentElement.content.images,
    },
}
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
