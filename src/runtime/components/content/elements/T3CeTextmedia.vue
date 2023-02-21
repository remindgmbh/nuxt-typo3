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
import { T3Api } from '#nuxt-typo3'
import { useT3CeTextmedia } from '#nuxt-typo3/composables/content/useT3CeTextmedia'

const props = defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Textmedia>
}>()

const { imageAttrs } = useT3CeTextmedia(props.contentElement)
</script>
