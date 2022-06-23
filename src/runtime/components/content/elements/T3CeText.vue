<template>
    <div
        class="t3-ce-text"
        :class="{
            [`t3-ce-text--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3CeHeader :content-element="contentElement" />
        <T3HtmlParser :content="contentElement.content.bodytext" />
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    contentElement: Api.ContentElement<Api.ContentText>
}>()
</script>
