<template>
    <div class="t3-text-asset">
        <div
            class="t3-text-asset__asset"
            :class="{
                't3-text-asset__asset--small': assetIsSmall,
                't3-text-asset__asset--large': !assetIsSmall,
                't3-text-asset__asset--right': assetIsRight,
            }"
        >
            <slot v-if="asset" :asset="asset" name="asset">
                <T3Asset :file="asset" />
            </slot>
        </div>
        <div
            class="t3-text-asset__text"
            :class="{
                't3-text-asset__text--large': assetIsSmall,
                't3-text-asset__text--small': !assetIsSmall,
            }"
        >
            <slot name="text">
                <T3Text :content="content" />
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type T3Model, useT3TextAsset } from '#imports'

const props = defineProps<{
    content: T3Model.Typo3.Content.Data.TextAsset
}>()

const { asset, assetIsRight, assetIsSmall } = useT3TextAsset(props.content)
</script>

<style lang="scss">
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
</style>
