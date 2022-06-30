<template>
    <div
        class="t3-ce-news"
        :class="{
            [`t3-ce-news--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <div v-if="settings.action === 'list'" class="t3-ce-news__list">
            <T3NewsList :content-element="contentElement" />
        </div>
        <div
            v-else-if="settings.action === 'detail' && detailElement"
            class="t3-ce-news__detail"
        >
            <T3NewsDetail :element="detailElement" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Api } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.NewsPi>
}>()

const settings = computed(() => props.contentElement.content.data.settings)
const detailElement = computed(() => props.contentElement.content.data.detail)
</script>
