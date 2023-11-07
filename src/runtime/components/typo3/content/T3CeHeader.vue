<template>
    <div class="ce-header">
        <component :is="Header" :content="contentElement.content" />
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3Content, useT3DynamicComponent } from '#imports'
import { T3Header } from '#components'

const { injectContentElement } = useT3Content()

const contentElement = injectContentElement<T3Model.Typo3.Content.Data.Header>()

const Header = useT3DynamicComponent<typeof T3Header>('Header')
</script>
