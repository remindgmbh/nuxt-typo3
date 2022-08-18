<template>
    <div
        class="t3-ce-textmedia"
        :class="{
            [`t3-ce-textmedia--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3TextAsset :content-element="contentElement">
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
import { Api } from '#nuxt-typo3'

defineProps<{
    contentElement: Api.ContentElement<Api.Content.Textmedia>
}>()
</script>
