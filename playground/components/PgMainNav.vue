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
import {
    useT3ColorScheme,
    useT3Navigation,
    useT3TopbarLayoutInjection,
} from '#imports'
import colors from '@/colors'

const { rootPageNavigation } = useT3Navigation()
const { injectMenu } = useT3TopbarLayoutInjection()
const { toggle } = injectMenu()

const colorScheme = useT3ColorScheme({
    light: {
        link: {
            active: colors.primary,
        },
    },
})
</script>

<style lang="scss">
.pg-main-nav {
    display: flex;
    gap: 1rem;
    padding: 1rem;

    &--column {
        flex-direction: column;
    }

    .router-link-active {
        color: v-bind('colorScheme.link?.active');
    }
}
</style>
