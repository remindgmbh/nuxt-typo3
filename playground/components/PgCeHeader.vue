<template>
    <div class="pg-ce-header">
        <T3Header :content="contentElement.content" />
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3ContentInjection, useT3ColorScheme } from '#imports'
import colors from '@/colors'

const { injectContentElement } = useT3ContentInjection()

const contentElement = injectContentElement<T3Model.Typo3.Content.Data.Header>()

const colorScheme = useT3ColorScheme({
    light: {
        font: colors.accent,
    },
    'light/black': {
        font: colors.white,
    },
    dark: {
        font: colors.secondary,
    },
    'dark/black': {
        font: colors.black,
    },
})
</script>

<style lang="scss">
.ce-header {
    color: v-bind('colorScheme.font');
}
</style>
