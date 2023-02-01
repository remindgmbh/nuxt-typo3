<template>
    <div class="t3-text-asset">
        <div
            class="t3-text-asset__asset"
            :class="{
                't3-text-asset__asset--small': assetIsSmall,
                't3-text-asset__asset--large': !assetIsSmall,
                't3-text-asset__asset--right': assetIsRight,
                [`t3-text-asset--${contentElement.appearance.backgroundColor}`]:
                    contentElement.appearance.backgroundColor,
            }"
        >
            <template v-if="asset">
                <div
                    v-if="type === 'video'"
                    class="t3-text-asset__video-container"
                >
                    <slot name="asset" :asset="asset">
                        <T3Asset :file="asset" :asset-attrs="assetAttrs" />
                    </slot>
                </div>
                <slot v-else name="asset" :asset="asset">
                    <T3Asset :file="asset" :asset-attrs="assetAttrs" />
                </slot>
            </template>
        </div>
        <div
            class="t3-text-asset__text"
            :class="{
                't3-text-asset__text--large': assetIsSmall,
                't3-text-asset__text--small': !assetIsSmall,
            }"
        >
            <slot name="text">
                <T3Text :content-element="contentElement" />
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { T3Api, useT3TextAsset } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Textmedia>
    assetAttrs?: { [key: string]: any }
}>()

const { asset, assetIsRight, assetIsSmall, type } = useT3TextAsset(
    props.contentElement.content
)
</script>

<style lang="scss">
@use 'sass:map';
@use '#nuxt-typo3/assets/styles/ce-breakpoints' as ce-breakpoints;
@use '#nuxt-typo3/assets/styles/breakpoints' as breakpoints;

@mixin width($small-asset, $large-asset) {
    .t3-text-asset {
        &__asset {
            &--large {
                @include breakpoints.up($large-asset) {
                    width: 50%;
                }
            }

            &--small {
                @include breakpoints.up($small-asset) {
                    width: calc(1 / 3 * 100%);
                }
            }
        }

        &__text {
            &--small {
                @include breakpoints.up($large-asset) {
                    width: 50%;
                }
            }

            &--large {
                @include breakpoints.up($small-asset) {
                    width: calc(2 / 3 * 100%);
                }
            }
        }
    }
}

.t3-text-asset {
    display: flex;
    flex-wrap: wrap;

    &__asset {
        width: 100%;

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
        width: 100%;
    }
}

.t3-ce-textpic {
    @include width(
        map.get(ce-breakpoints.$breakpoints, 'textpic-two-columns-small-asset'),
        map.get(ce-breakpoints.$breakpoints, 'textpic-two-columns-large-asset')
    );
}

.t3-ce-textmedia {
    @include width(
        map.get(
            ce-breakpoints.$breakpoints,
            'textmedia-two-columns-small-asset'
        ),
        map.get(
            ce-breakpoints.$breakpoints,
            'textmedia-two-columns-large-asset'
        )
    );
}
</style>
