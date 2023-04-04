<template>
    <T3TopbarLayout
        v-slot="{ headerHeight }"
        v-model:scrollbar-disabled="scrollbarDisabled"
        class="app"
    >
        <T3TopbarLayoutHeader
            class="app__header"
            :class="{ 'app__header--dense': !top }"
        >
            <T3Menu
                v-slot="{ activeItem, toggle, close }"
                :items="navItemsWithChildren"
                id-field="link"
                class="app__nav"
            >
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
                            <button
                                v-else
                                :id="navItem.link"
                                ref="menuTriggers"
                                @click="() => toggle(navItem.link)"
                            >
                                {{ navItem.title }} ↓
                            </button>
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
                    <button @click="toggleTheme">
                        {{ selectedTheme }}
                    </button>
                    <button v-if="isLoggedIn" @click="logout">Logout</button>
                </div>
                <T3CollapseTransition
                    transition-name="menu-collapse-transition"
                >
                    <T3AutoHeightContainer
                        ref="dropdown"
                        v-on-click-outside="[close, { ignore: menuTriggers }]"
                        class="app__nav-dropdown"
                    >
                        <div
                            v-if="activeItem"
                            class="app__nav-items app__nav-items--column"
                        >
                            <NuxtLink
                                :key="activeItem.link"
                                class="app__nav-item"
                                :to="activeItem.link"
                                >{{ activeItem.title }}</NuxtLink
                            >
                            <NuxtLink
                                v-for="navItem in activeItem.children"
                                :key="navItem.link"
                                class="app__nav-item"
                                :to="navItem.link"
                                >{{ navItem.title }}</NuxtLink
                            >
                        </div>
                    </T3AutoHeightContainer>
                </T3CollapseTransition>
            </T3Menu>
        </T3TopbarLayoutHeader>
        <T3TopbarLayoutSidebar
            v-model="sidebarVisible"
            class="app__sidebar"
            :transition="{
                name: 'sidebar-transition',
                onEnter: (el) => sidebarOnEnter(el, headerHeight),
                onLeave: sidebarOnLeave,
            }"
        >
            <div>top</div>
            <div v-for="i in 100" :key="i">{{ i }}</div>
            <div>bottom</div>
        </T3TopbarLayoutSidebar>
        <T3TopbarLayoutContent class="app__content">
            <div
                class="app__loading-bar"
                :class="{ 'app__loading-bar--visible': loadingPage }"
            >
                <div class="app__loading-progress"></div>
            </div>
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
import { vOnClickOutside } from '@vueuse/components'

const { showBanner } = useT3Cookiebot()
const { currentFooterContent } = useT3ApiData()
const { loadingPage } = useT3LoadingState()
const { availableLanguages } = useT3Languages()
const { navItemsWithChildren, rootPageNavigation } = useT3Navigation()
const { isLoggedIn, logout } = useT3UserState()
const { detectScrollEnd } = useT3Util()
const { colors, selectedTheme } = useT3Theme()

const sidebarVisible = ref(false)
const scrollbarDisabled = ref(false)
const top = ref(true)
const menuTriggers = ref([])

function toggleSidebar(): void {
    sidebarVisible.value = !sidebarVisible.value
}

function toggleScrollbar(): void {
    scrollbarDisabled.value = !scrollbarDisabled.value
}

function toggleTheme(): void {
    selectedTheme.value = selectedTheme.value === 'dark' ? 'light' : 'dark'
}

function sidebarOnEnter(element: HTMLElement, headerHeight: string) {
    element.style.height = 'auto'
    element.style.maxHeight = `calc(100% - ${headerHeight})`

    const height = getComputedStyle(element).height

    element.style.height = '0'
    element.style.maxHeight = ''

    // Force repaint to make sure the
    // animation is triggered correctly.
    // eslint-disable-next-line no-unused-expressions
    getComputedStyle(element).height

    element.style.height = height
}

function sidebarOnLeave(element: HTMLElement): void {
    element.style.height = '0'
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
.app {
    position: relative;
    color: v-bind('colors.default.contrast');

    &__loading-bar {
        position: absolute;
        background-color: v-bind('colors.primary.value');
        height: 0;
        width: 100%;

        &--visible {
            height: 0.125rem;
        }
    }

    &__loading-progress {
        position: absolute;
        top: 0;
        right: 100%;
        bottom: 0;
        left: 0;
        background-color: v-bind('colors.secondary.value');
        animation: loading 2s linear infinite;
    }

    &__header {
        background-color: v-bind('colors.default.value');
        height: 5rem;
        transition: height 0.5s;
        display: flex;

        &--dense {
            height: 3rem;
        }
    }

    &__footer {
        background-color: v-bind('colors.secondary.value');
        color: v-bind('colors.white.value');
    }

    &__nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.125rem v-bind('colors.secondary.value') solid;
        width: 100%;

        .menu-collapse-transition {
            &-enter-active,
            &-leave-active {
                transition: height 0.5s;
            }
        }
    }

    &__sidebar {
        background-color: v-bind('colors.primary.value');
        width: 100%;
        border-bottom: solid 1rem v-bind('colors.accent.value');
        box-sizing: border-box;
        overflow: auto;
    }

    &__content {
        overflow-x: hidden;
        position: relative;
        background-color: v-bind('colors.default.value');
    }

    &__nav-items {
        display: flex;
        gap: 1rem;
        padding: 1rem;

        &--column {
            flex-direction: column;
        }

        .router-link-active {
            color: v-bind('colors.primary.value');
        }
    }

    &__nav-dropdown {
        background-color: v-bind('colors.accent.value');
        position: absolute;
        top: 100%;
        width: 100%;
        transition: height 0.5s;

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
            transition: height 0.5s;
        }

        &-leave-active {
            transition: height 0.25s;
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
