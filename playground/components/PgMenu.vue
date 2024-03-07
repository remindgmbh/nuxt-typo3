<template>
    <div class="pg-menu">
        <div>top</div>
        <button @click="menuVisible = false">close</button>
        <div v-for="i in 100" :key="i">{{ i }}</div>
        <div>bottom</div>
    </div>
</template>

<script setup lang="ts">
import { useT3ColorScheme, useT3TopbarLayoutInjection } from '#imports'
import colors from '@/colors'

const colorScheme = useT3ColorScheme({
    light: {
        background: colors.primary,
        border: colors.accent,
    },
})

const { injectMenuVisible } = useT3TopbarLayoutInjection()

const menuVisible = injectMenuVisible()
</script>

<style lang="scss">
.pg-menu {
    background-color: v-bind('colorScheme.background');
    border-bottom: solid 1rem v-bind('colorScheme.border');
    box-sizing: border-box;
    min-height: 100%;
}
</style>
