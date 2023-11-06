<template>
    <div class="t3-ce-header">
        <T3Header :content="contentElement.content" />
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3Content } from '#imports'

const { injectContentElement } = useT3Content()

const contentElement = injectContentElement<T3Model.Typo3.Content.Data.Header>()
</script>
