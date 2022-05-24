<template>
    <div class="t3-ce-accordion">
        <T3CeHeader :id="id" :content="content" />
        <T3Accordion :items="content.items">
            <template #title="{ item }">
                {{ item.title }}
            </template>
            <template #content="{ item }">
                <T3CeText :id="item.id" :content="item" />
            </template>
        </T3Accordion>
    </div>
</template>

<script setup lang="ts">
import { ContentAccordion } from '#nuxt-typo3/api'

defineProps<{
    id: number
    content: ContentAccordion
}>()
</script>
