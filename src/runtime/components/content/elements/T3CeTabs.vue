<template>
    <div
        class="t3-ce-tabs"
        :class="{
            [`t3-ce-tabs--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3Header :content-element="contentElement" />
        <T3Tabs :items="contentElement.content.items">
            <template #title="{ item, index }">
                <slot name="title" :item="item" :index="index">
                    {{ item.title }}
                </slot>
            </template>
            <template #content="{ item }">
                <slot name="content" :item="item">
                    <T3Text
                        :content-element="{ ...contentElement, content: item }"
                    />
                </slot>
            </template>
        </T3Tabs>
    </div>
</template>

<script setup lang="ts">
import { T3Api } from '#nuxt-typo3'

defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Tabs>
}>()
</script>
