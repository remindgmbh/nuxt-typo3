<template>
    <div class="app">
        <div class="app__nav-bar">
            <div class="app__nav-items">
                <template v-if="rootPageNavigation">
                    <router-link
                        class="app__nav-item"
                        :to="rootPageNavigation.link"
                        >{{ rootPageNavigation.title }}</router-link
                    >
                    <router-link
                        v-for="navItem in rootPageNavigation.children"
                        :key="navItem.link"
                        :to="navItem.link"
                        >{{ navItem.title }}</router-link
                    >
                </template>
            </div>
            <div class="app__nav-items">
                <router-link
                    v-for="language in languages"
                    :key="language.link"
                    :to="language.link"
                    >{{ language.navigationTitle }}</router-link
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
