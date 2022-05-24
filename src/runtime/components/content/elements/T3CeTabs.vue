<template>
    <div class="t3-ce-tabs">
        <T3CeHeader :id="id" :content="content" />
        <T3Tabs :items="content.items">
            <template #title="{ item }">
                {{ item.title }}
            </template>
            <template #content="{ item }">
                <T3CeText :id="item.id" :content="item" />
            </template>
        </T3Tabs>
    </div>
</template>

<script setup lang="ts">
import { ContentTabs } from '#nuxt-typo3/api'

defineProps<{
    id: number
    content: ContentTabs
}>()
</script>
