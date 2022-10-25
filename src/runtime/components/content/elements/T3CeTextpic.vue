<template>
    <div
        class="t3-ce-textpic"
        :class="{
            [`t3-ce-textpic--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3TextAsset
            :content-element="contentElement"
            :asset-attrs="imageAttrs"
        />
    </div>
</template>

<script setup lang="ts">
import { T3Api, useT3CeTextpic } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Textpic>
}>()

const { imageAttrs, textmediaContentElement: contentElement } = useT3CeTextpic(
    props.contentElement
)
</script>
