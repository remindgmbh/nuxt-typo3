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
            <template #title="{ item, index }">
                <slot name="title" :item="item" :index="index">
                    {{ item.title }}
                </slot>
            </template>
            <template #content="{ item, index }">
                <slot name="content" :item="item" :index="index">
                    <T3Text
                        :content-element="{ ...contentElement, content: item }"
                    />
                </slot>
            </template>
        </T3Accordion>
    </div>
</template>

<script setup lang="ts">
import { T3Api } from '#nuxt-typo3'

defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Accordion>
}>()
</script>
