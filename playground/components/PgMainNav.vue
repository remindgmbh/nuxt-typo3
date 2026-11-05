<template>
    <div class="pg-main-nav">
        <template v-if="rootPageNavigation">
            <NuxtLink class="pg-main-nav__item" :to="rootPageNavigation.link">{{
                rootPageNavigation.title
            }}</NuxtLink>
            <template
                v-for="navItem in rootPageNavigation.children"
                :key="navItem.link"
            >
                <NuxtLink
                    v-if="!navItem.children"
                    class="pg-main-nav__item"
                    :to="navItem.link"
                    >{{ navItem.title }}</NuxtLink
                >
                <button
                    v-else
                    :id="navItem.link"
                    @click="() => toggle(navItem.link)"
                >
                    {{ navItem.title }} ↓
                </button>
            </template>
            <NuxtLink class="pg-main-nav__item" to="/static">Static</NuxtLink>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useT3LayoutInjection, useT3Navigation } from '#imports'

const { rootPageNavigation } = useT3Navigation()
const { injectMenu } = useT3LayoutInjection()
const { toggle } = injectMenu()
</script>

<style lang="scss">
.pg-main-nav {
    display: flex;
    gap: 1rem;
    padding: 1rem;

    &--column {
        flex-direction: column;
    }
}
</style>
