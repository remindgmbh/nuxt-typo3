<template>
    <div v-if="active === 'menu'" class="pg-menu">
        <div>top</div>
        <button @click="close">close</button>
        <div v-for="i in 100" :key="i">{{ i }}</div>
        <div>bottom</div>
    </div>
</template>

<script setup lang="ts">
import { useT3ColorScheme, useT3LayoutInjection } from '#imports'
import colors from '@/colors'

const colorScheme = useT3ColorScheme({
    light: {
        background: colors.primary,
        border: colors.accent,
    },
})

const { injectMenu } = useT3LayoutInjection()
const { active, close } = injectMenu()
</script>

<style lang="scss">
.pg-menu {
    background-color: v-bind('colorScheme.background');
    border-bottom: solid 1rem v-bind('colorScheme.border');
    box-sizing: border-box;
    min-height: 100%;
}
</style>
