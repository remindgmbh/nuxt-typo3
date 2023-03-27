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
            <div v-if="asset" class="t3-text-asset__asset-wrapper">
                <slot name="asset" :asset="asset">
                    <T3Asset :file="asset" :asset-attrs="assetAttrs" />
                </slot>
            </div>
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
import { T3Api } from '#nuxt-typo3'
import { useT3TextAsset } from '#nuxt-typo3/composables/content/useT3TextAsset'

const props = defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Textmedia>
    assetAttrs?: { [key: string]: any }
}>()

const { asset, assetIsRight, assetIsSmall } = useT3TextAsset(
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
