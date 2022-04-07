<template>
    <div class="app">
        <div class="app__nav-bar">
            <div class="app__nav-items">
                <NuxtLink class="app__nav-item" :to="navItemRoot.link">{{
                    navItemRoot.title
                }}</NuxtLink>
                <NuxtLink
                    v-for="navItem in navItems"
                    :key="navItem.link"
                    :to="navItem.link"
                    >{{ navItem.title }}</NuxtLink
                >
            </div>
            <div class="app__nav-items">
                <NuxtLink
                    v-for="language in languages"
                    :key="language.link"
                    :to="language.link"
                    >{{ language.navigationTitle }}</NuxtLink
                >
            </div>
        </div>
        <div class="app__page">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const typo3Store = useTypo3Store()

const { initialData } = storeToRefs(typo3Store)

const navItemRoot = computed(() => initialData.value.navigation[0])
const navItems = computed(() => initialData.value.navigation[0].children)
const languages = computed(() => initialData.value.i18n)
</script>
<style lang="scss">
@use '@/assets/variables.scss' as *;

.app {
    &__nav-bar {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
    }

    &__nav-items {
        display: flex;
        gap: 1rem;
    }
}

.router-link-active {
    color: $color-primary;
}
</style>
