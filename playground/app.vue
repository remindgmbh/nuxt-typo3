<template>
    <T3TopbarLayout v-model:scrollbar-disabled="scrollbarDisabled" class="app">
        <T3TopbarLayoutHeader class="app__header">
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
                        class="app__nav-item"
                        :to="navItem.link"
                        >{{ navItem.title }}</router-link
                    >
                </template>
            </div>
            <div class="app__nav-items">
                <router-link
                    v-for="language in languages"
                    :key="language.link"
                    class="app__nav-item"
                    :to="language.link"
                    >{{ language.navigationTitle }}</router-link
                >
                <button @click="toggleSidebar">Toggle Sidebar</button>
                <button @click="toggleScrollbar">Toggle Scrollbar</button>
            </div>
        </T3TopbarLayoutHeader>
        <T3TopbarLayoutSidebar v-model="sidebarVisible" class="app__sidebar">
            <div>Sidebar Content</div>
        </T3TopbarLayoutSidebar>
        <T3TopbarLayoutContent>
            <NuxtPage />
        </T3TopbarLayoutContent>
    </T3TopbarLayout>
</template>

<script setup lang="ts">
const { languages, rootPageNavigation } = useInitialData()

const sidebarVisible = ref(false)
const scrollbarDisabled = ref(false)

function toggleSidebar(): void {
    sidebarVisible.value = !sidebarVisible.value
}

function toggleScrollbar(): void {
    scrollbarDisabled.value = !scrollbarDisabled.value
}
</script>
<style lang="scss">
@use '@/assets/variables.scss' as *;

.app {
    &__header {
        background-color: $color-background;
        display: flex;
        justify-content: space-between;
    }

    &__sidebar {
        background-color: $color-secondary;
    }

    &__nav-items {
        display: flex;
        gap: 1rem;
        padding: 1rem;
    }

    .sidebar-transition {
        &-enter-active {
            transition: transform 0.5s;
        }

        &-leave-active {
            transition: transform 0.25s;
        }

        &-enter-from,
        &-leave-to {
            transform: translateX(-100%);
        }

        &-enter-to,
        &-leave-from {
            transform: translateX(0);
        }
    }
}

.router-link-active {
    color: $color-primary;
}
</style>
