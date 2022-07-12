<template>
    <div
        class="t3-ce-textpic"
        :class="{
            [`t3-ce-textpic--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3CeTextmedia :content-element="contentElement" />
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.Textpic>
}>()

const contentElement: Api.ContentElement<Api.Content.Textmedia> = {
    ...props.contentElement,
    content: {
        ...props.contentElement.content,
        assetPosition: props.contentElement.content.imagePosition,
        assets: props.contentElement.content.images,
    },
}
</script>
