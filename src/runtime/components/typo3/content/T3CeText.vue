<template>
    <div class="ce-text">
        <component :is="Text" :content="contentElement.content" />
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3Content, useT3DynamicComponent } from '#imports'
import { T3Text } from '#components'

const { injectContentElement } = useT3Content()

const contentElement = injectContentElement<T3Model.Typo3.Content.Data.Text>()

const Text = useT3DynamicComponent<typeof T3Text>('Text')
</script>
