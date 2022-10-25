<template>
    <T3TopbarLayout v-model:scrollbar-disabled="scrollbarDisabled" class="app">
        <T3TopbarLayoutHeader
            class="app__header"
            :class="{ 'app__header--dense': !top }"
        >
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
                        <NuxtLink class="app__nav-item" to="/static"
                            >Static</NuxtLink
                        >
                    </template>
                </div>
                <div class="app__nav-items">
                    <NuxtLink
                        v-for="language in availableLanguages"
                        :key="language.link"
                        class="app__nav-item"
                        :to="language.link"
                        >{{ language.navigationTitle }}</NuxtLink
                    >
                    <button @click="toggleSidebar">Toggle Sidebar</button>
                    <button @click="toggleScrollbar">Toggle Scrollbar</button>
                    <button v-if="isLoggedIn" @click="logout">Logout</button>
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
            <div>top</div>
            <div v-for="i in 100" :key="i">{{ i }}</div>
            <div>bottom</div>
        </T3TopbarLayoutSidebar>
        <T3TopbarLayoutContent class="app__content">
            <NuxtPage
                :transition="{ name: 'page-transition', mode: 'in-out' }"
            />
        </T3TopbarLayoutContent>
        <T3TopbarLayoutFooter v-if="currentFooterContent" class="app__footer">
            <pre>{{ currentFooterContent.content }}</pre>
            <button @click="showBanner">Cookies</button>
        </T3TopbarLayoutFooter>
    </T3TopbarLayout>
</template>

<script setup lang="ts">
const { showBanner } = useT3Cookiebot()
const { currentFooterContent } = useT3ApiData()
const { availableLanguages } = useT3Languages()
const { navItemsWithChildren, rootPageNavigation } = useT3Navigation()
const { isLoggedIn, logout } = useT3UserState()
const { detectScrollEnd } = useT3Util()

const sidebarVisible = ref(false)
const scrollbarDisabled = ref(false)
const top = ref(true)

function toggleSidebar(): void {
    sidebarVisible.value = !sidebarVisible.value
}

function toggleScrollbar(): void {
    scrollbarDisabled.value = !scrollbarDisabled.value
}

onMounted(() => {
    detectScrollEnd(document.body, 'top', (detached) => {
        if (!scrollbarDisabled.value) {
            top.value = !detached
        }
    })
})
</script>
<style lang="scss">
@use '@/assets/variables.scss' as *;

.app {
    &__header {
        background-color: $color-background;
        height: 5rem;
        transition: height 0.5s;
        display: flex;

        &--dense {
            height: 3rem;
        }
    }

    &__footer {
        background-color: $color-secondary;
        color: $color-white;
    }

    &__nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.125rem $color-secondary solid;
        width: 100%;
    }

    &__sidebar {
        background-color: $color-primary;
        width: 100%;
        border-bottom: solid 1rem $color-accent;
        box-sizing: border-box;
        overflow: auto;
    }

    &__content {
        overflow-x: hidden;
        position: relative;
    }

    &__nav-items {
        display: flex;
        gap: 1rem;
        padding: 1rem;

        &--column {
            flex-direction: column;
        }

        .router-link-active {
            color: $color-primary;
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

    .page-transition {
        &-enter-active,
        &-leave-active {
            transition: transform 0.5s;
            position: absolute;
            width: 100%;
        }

        &-enter-from {
            transform: translateX(100%);
        }

        &-leave-to {
            transform: translateX(-100%);
        }

        &-enter-to,
        &-leave-from {
            transform: translateY(0);
        }
    }
}
</style>
