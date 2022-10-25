<template>
    <div
        class="t3-ce-text"
        :class="{
            [`t3-ce-text--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Text :content-element="contentElement" />
    </div>
</template>

<script setup lang="ts">
import { T3Api } from '#nuxt-typo3'

defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Text>
}>()
</script>
