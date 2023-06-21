<template>
    <T3TopbarLayout v-model:scrollbar-disabled="scrollbarDisabled" class="app">
        <T3TopbarLayoutHeader class="app__header">
            <PgMainNav />
            <PgMetaNav
                v-model:scrollbar-disabled="scrollbarDisabled"
                v-model:sidebar-visible="sidebarVisible"
            />
            <PgDropdown />
        </T3TopbarLayoutHeader>
        <T3TopbarLayoutSidebar
            v-model="sidebarVisible"
            class="app__sidebar"
            :transition="{
                name: 'sidebar-transition',
                onEnter: sidebarOnEnter,
                onLeave: sidebarOnLeave,
            }"
        >
            <div class="app__sidebar-content">
                <div>top</div>
                <div v-for="i in 100" :key="i">{{ i }}</div>
                <div>bottom</div>
            </div>
        </T3TopbarLayoutSidebar>
        <T3TopbarLayoutContent class="app__content">
            <div
                class="app__loading-bar"
                :class="{
                    'app__loading-bar--visible': loading.type === 'page',
                }"
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
import { gsap } from 'gsap'
import {
    computed,
    onMounted,
    ref,
    useT3Cookiebot,
    useT3ApiData,
    useT3LoadingState,
    useT3Util,
    useT3Theme,
} from '#imports'

const HEADER_HEIGHT = '5rem'
const HEADER_HEIGHT_DENSE = '3rem'

const { showBanner } = useT3Cookiebot()
const { currentFooterContent } = useT3ApiData()
const loading = useT3LoadingState()
const { detectScrollEnd } = useT3Util()
const { themeOptions } = useT3Theme()

const colors = computed(() => themeOptions.value?.additionalData)

const sidebarVisible = ref(false)
const scrollbarDisabled = ref(false)
const headerHeight = ref(HEADER_HEIGHT)

function sidebarOnEnter(element: Element, done: () => void) {
    if (!(element instanceof HTMLElement)) {
        return
    }
    const initialHeight = element.style.height
    gsap.fromTo(
        element,
        { height: 0 },
        {
            height: element.clientHeight,
            duration: 1,
            onComplete: () => {
                done()
                element.style.height = initialHeight
            },
        }
    )
}

function sidebarOnLeave(element: Element, done: () => void): void {
    if (!(element instanceof HTMLElement)) {
        return
    }
    const initialHeight = element.style.height
    gsap.fromTo(
        element,
        { height: element.clientHeight },
        {
            height: 0,
            duration: 1,
            onComplete: () => {
                done()
                element.style.height = initialHeight
            },
        }
    )
}

onMounted(() => {
    detectScrollEnd(document.body, 'top', (detached) => {
        headerHeight.value = detached ? HEADER_HEIGHT_DENSE : HEADER_HEIGHT
    })
})
</script>
<style lang="scss">
.app {
    position: relative;
    color: v-bind('colors.font');

    &__loading-bar {
        position: absolute;
        background-color: v-bind('colors.background');
        height: 0;
        width: 100%;

        &--visible {
            height: 0.125rem;
        }
    }

    &__loading-progress {
        position: absolute;
        inset: 0 100% 0 0;
        background-color: v-bind('colors.secondary');
        animation: loading 2s linear infinite;
    }

    &__header {
        background-color: v-bind('colors.background');
        height: v-bind(headerHeight);
        transition: height 0.5s;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.125rem v-bind('colors.secondary') solid;
        width: 100%;
    }

    &__footer {
        background-color: v-bind('colors.secondary');
        color: v-bind('colors.background');
    }

    &__sidebar {
        margin-top: v-bind(headerHeight);
        width: 100%;
        height: calc(100% - v-bind(headerHeight));
        overflow: auto;
    }

    &__sidebar-content {
        background-color: v-bind('colors.primary');
        border-bottom: solid 1rem v-bind('colors.accent');
        box-sizing: border-box;
    }

    &__content {
        overflow-x: hidden;
        position: relative;
        background-color: v-bind('colors.background');
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
