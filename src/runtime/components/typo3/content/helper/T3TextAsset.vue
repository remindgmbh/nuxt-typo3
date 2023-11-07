<template>
    <div class="text-asset">
        <div
            class="text-asset__asset"
            :class="{
                'text-asset__asset--small': assetIsSmall,
                'text-asset__asset--large': !assetIsSmall,
                'text-asset__asset--right': assetIsRight,
            }"
        >
            <slot v-if="asset" name="asset" :asset="asset">
                <T3Asset :file="asset" />
            </slot>
        </div>
        <div
            class="text-asset__text"
            :class="{
                'text-asset__text--large': assetIsSmall,
                'text-asset__text--small': !assetIsSmall,
            }"
        >
            <slot name="text">
                <component :is="Text" :content="content" />
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3DynamicComponent, useT3TextAsset } from '#imports'
import { T3Text } from '#components'

const props = defineProps<{
    content: T3Model.Typo3.Content.Data.TextAsset
}>()

const Text = useT3DynamicComponent<typeof T3Text>('Text')

const { asset, assetIsRight, assetIsSmall } = useT3TextAsset(props.content)
</script>

<style lang="scss">
.text-asset {
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
