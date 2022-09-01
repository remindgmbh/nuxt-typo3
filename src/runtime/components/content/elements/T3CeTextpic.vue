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
import { Api, useCeTextpic } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Textpic>
}>()

const { imageAttrs, textmediaContentElement: contentElement } = useCeTextpic(
    props.contentElement
)
</script>
