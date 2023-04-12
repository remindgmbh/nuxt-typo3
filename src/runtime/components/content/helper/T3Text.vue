<template>
    <div
        class="t3-text"
        :class="{
            [`t3-text--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Header :content-element="contentElement" />
        <T3HtmlParser :content="contentElement.content.bodytext" />
    </div>
</template>

<script setup lang="ts">
import { T3Api } from '#imports'

defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Text>
}>()
</script>
