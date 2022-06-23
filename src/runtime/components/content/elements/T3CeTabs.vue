<template>
    <div
        class="t3-ce-tabs"
        :class="{
            [`t3-ce-tabs--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3CeHeader :content-element="contentElement" />
        <T3Tabs :items="contentElement.content.items">
            <template #title="{ item }">
                {{ item.title }}
            </template>
            <template #content="{ item }">
                <T3CeText
                    :content-element="{ ...contentElement, content: item }"
                />
            </template>
        </T3Tabs>
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    contentElement: Api.ContentElement<Api.ContentTabs>
}>()
</script>
