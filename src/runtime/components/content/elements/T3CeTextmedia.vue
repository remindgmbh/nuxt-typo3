<template>
    <div
        class="t3-ce-textmedia"
        :class="{
            [`t3-ce-textmedia--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3TextAsset
            :content-element="contentElement"
            :asset-attrs="imageAttrs"
        >
            <template #asset="{ asset }">
                <slot name="asset" :asset="asset" />
            </template>
            <template #text>
                <slot name="text" />
            </template>
        </T3TextAsset>
    </div>
</template>

<script setup lang="ts">
import { Api, useCeTextmedia } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Textmedia>
}>()

const { imageAttrs } = useCeTextmedia(props.contentElement)
</script>
