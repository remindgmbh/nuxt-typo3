<template>
    <div
        class="t3-ce-accordion"
        :class="{
            [`t3-ce-accordion--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Header :content-element="contentElement" />
        <T3Accordion :items="contentElement.content.items">
            <template #title="{ item }">
                {{ item.title }}
            </template>
            <template #content="{ item }">
                <T3Text
                    :content-element="{ ...contentElement, content: item }"
                />
            </template>
        </T3Accordion>
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    contentElement: Api.ContentElement<Api.Content.Accordion>
}>()
</script>
