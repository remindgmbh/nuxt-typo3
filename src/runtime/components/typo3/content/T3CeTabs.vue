<template>
    <div class="t3-ce-tabs">
        <T3Header
            class="t3-ce-tabs__header"
            :content="contentElement.content"
        />
        <T3Tabs :items="contentElement.content.items">
            <template #title="{ item, index }">
                <slot name="title" :item="item" :index="index">
                    {{ item.title }}
                </slot>
            </template>
            <template #content="{ item }">
                <slot name="content" :item="item">
                    <T3Text :content="item" />
                </slot>
            </template>
        </T3Tabs>
    </div>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Tabs>
}>()
</script>
