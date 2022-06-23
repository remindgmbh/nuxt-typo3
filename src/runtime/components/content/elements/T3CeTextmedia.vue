<template>
    <div
        class="t3-ce-textmedia"
        :class="{
            [`t3-ce-textmedia--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <div
            class="t3-ce-textmedia__asset"
            :class="{
                't3-ce-textmedia__asset--small': assetIsSmall,
                't3-ce-textmedia__asset--right': assetIsRight,
            }"
        >
            <template v-if="asset">
                <div
                    v-if="assetIsVideo"
                    class="t3-ce-textmedia__video-container"
                >
                    <T3Asset :file="asset" />
                </div>
                <T3Asset v-else :file="asset" />
            </template>
        </div>
        <div
            class="t3-ce-textmedia__text"
            :class="{
                't3-ce-textmedia__text--large': assetIsSmall,
            }"
        >
            <T3CeHeader :content-element="contentElement" />
            <T3HtmlParser :content="contentElement.content.bodytext" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Api, useCeTextmedia } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.ContentTextmedia>
}>()

const { asset, assetIsRight, assetIsSmall, assetIsVideo } = useCeTextmedia(
    props.contentElement.content
)
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

    &__video-container {
        width: 100%;
        position: relative;
        overflow: hidden;

        // Aspect Ratio 16 / 9
        padding-top: calc(9 / 16 * 100%);

        video,
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
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
