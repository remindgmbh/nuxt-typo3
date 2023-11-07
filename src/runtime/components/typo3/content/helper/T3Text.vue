<template>
    <div class="text">
        <component :is="Header" :content="content" />
        <component :is="HtmlParser" :content="content.bodytext" />
    </div>
</template>

<script setup lang="ts">
import { T3Header, T3HtmlParser } from '#components'
import { T3Model, useT3DynamicComponent } from '#imports'

defineProps<{
    content: T3Model.Typo3.Content.Data.Text
}>()

const Header = useT3DynamicComponent<typeof T3Header>('Header')
const HtmlParser = useT3DynamicComponent<typeof T3HtmlParser>('HtmlParser')
</script>
