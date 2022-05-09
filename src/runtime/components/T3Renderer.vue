<template>
    <template
        v-for="contentElement in props.contentElements"
        :key="contentElement.id"
    >
        <!-- TODO only use T3Background if background color is set -->
        <T3Background :appearance="contentElement.appearance">
            <T3Frame :appearance="contentElement.appearance">
                <T3Content
                    :id="contentElement.id"
                    :type="contentElement.type"
                    :content="contentElement.content"
                />
            </T3Frame>
        </T3Background>
    </template>
</template>

<script setup lang="ts">
import { ContentElement } from '../api'

const props = withDefaults(
    defineProps<{
        contentElements?: ContentElement[]
    }>(),
    { contentElements: () => [] }
)
</script>
