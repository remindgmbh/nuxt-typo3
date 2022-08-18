<template>
    <div class="t3-text-asset">
        <div
            class="t3-text-asset__asset"
            :class="{
                't3-text-asset__asset--small': assetIsSmall,
                't3-text-asset__asset--right': assetIsRight,
                [`t3-text-asset--${contentElement.appearance.backgroundColor}`]:
                    contentElement.appearance.backgroundColor,
            }"
        >
            <template v-if="asset">
                <div v-if="assetIsVideo" class="t3-text-asset__video-container">
                    <slot name="asset" :asset="asset">
                        <T3Asset :file="asset" />
                    </slot>
                </div>
                <slot v-else name="asset" :asset="asset">
                    <T3Asset :file="asset" />
                </slot>
            </template>
        </div>
        <div
            class="t3-text-asset__text"
            :class="{
                't3-text-asset__text--large': assetIsSmall,
            }"
        >
            <slot name="text">
                <T3Text :content-element="contentElement" />
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Api, useTextAsset } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Textmedia>
}>()

const { asset, assetIsRight, assetIsSmall, assetIsVideo } = useTextAsset(
    props.contentElement.content
)
</script>

<style lang="scss">
.t3-text-asset {
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
