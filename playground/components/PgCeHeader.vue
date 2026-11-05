<template>
    <div class="pg-ce-header">
        <T3Header :content="contentElement.content" />
    </div>
</template>

<script setup lang="ts">
import { type T3Model, useT3ContentInjection } from '#imports'

const { injectContentElement } = useT3ContentInjection()

const contentElement = injectContentElement<T3Model.Typo3.Content.Data.Header>()
</script>

<style lang="scss"></style>
