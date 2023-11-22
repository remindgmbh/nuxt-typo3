<template>
    <T3CeHeader />
</template>

<script setup lang="ts">
import { T3CeHeader } from '#components'
import colors from '@/colors'

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
