<template>
    <div class="app">
        <div class="app__nav-bar">
            <div class="app__nav-items">
                <template v-if="rootPageNavigation">
                    <NuxtLink
                        class="app__nav-item"
                        :to="rootPageNavigation.link"
                        >{{ rootPageNavigation.title }}</NuxtLink
                    >
                    <NuxtLink
                        v-for="navItem in rootPageNavigation.children"
                        :key="navItem.link"
                        :to="navItem.link"
                        >{{ navItem.title }}</NuxtLink
                    >
                </template>
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
const { languages, rootPageNavigation } = useTypo3State()
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
