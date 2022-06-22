<template>
    <T3TopbarLayout v-model:scrollbar-disabled="scrollbarDisabled" class="app">
        <T3TopbarLayoutHeader class="app__header">
            <T3Menu class="app__nav">
                <div class="app__nav-items">
                    <template v-if="rootPageNavigation">
                        <NuxtLink
                            class="app__nav-item"
                            :to="rootPageNavigation.link"
                            >{{ rootPageNavigation.title }}</NuxtLink
                        >
                        <template
                            v-for="navItem in rootPageNavigation.children"
                            :key="navItem.link"
                        >
                            <NuxtLink
                                v-if="!navItem.children"
                                class="app__nav-item"
                                :to="navItem.link"
                                >{{ navItem.title }}</NuxtLink
                            >
                            <T3MenuTrigger v-else :id="navItem.link">
                                {{ navItem.title }} ↓
                            </T3MenuTrigger>
                        </template>
                    </template>
                </div>
                <div class="app__nav-items">
                    <NuxtLink
                        v-for="language in languages"
                        :key="language.link"
                        class="app__nav-item"
                        :to="language.link"
                        >{{ language.navigationTitle }}</NuxtLink
                    >
                    <button @click="toggleSidebar">Toggle Sidebar</button>
                    <button @click="toggleScrollbar">Toggle Scrollbar</button>
                </div>
                <T3MenuDropdown
                    v-slot="{ item }"
                    class="app__nav-dropdown"
                    id-field="link"
                    :items="navItemsWithChildren"
                >
                    <div class="app__nav-items app__nav-items--column">
                        <NuxtLink
                            :key="item.link"
                            class="app__nav-item"
                            :to="item.link"
                            >{{ item.title }}</NuxtLink
                        >
                        <NuxtLink
                            v-for="navItem in item.children"
                            :key="navItem.link"
                            class="app__nav-item"
                            :to="navItem.link"
                            >{{ navItem.title }}</NuxtLink
                        >
                    </div>
                </T3MenuDropdown>
            </T3Menu>
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
const { languages, rootPageNavigation } = useApiData()

const sidebarVisible = ref(false)
const scrollbarDisabled = ref(false)

const navItemsWithChildren = computed(() =>
    (rootPageNavigation.value?.children ?? []).filter((child) => child.children)
)

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
    }

    &__nav {
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

        &--column {
            flex-direction: column;
        }
    }

    &__nav-dropdown {
        background-color: $color-accent;

        .menu-change-transition {
            &-enter-active,
            &-leave-active {
                transition: opacity 0.5s;
            }

            &-enter-from,
            &-leave-to {
                opacity: 0;
            }

            &-enter-to,
            &-leave-from {
                opacity: 1;
            }
        }
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
