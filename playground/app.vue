<template>
    <T3TopbarLayout v-model:scrollbar-disabled="scrollbarDisabled" class="app">
        <T3TopbarLayoutHeader class="app__header">
            <PgMainNav />
            <PgMetaNav
                v-model:scrollbar-disabled="scrollbarDisabled"
                v-model:menu-visible="menuVisible"
            />
            <PgDropdown />
        </T3TopbarLayoutHeader>
        <T3TopbarLayoutMenu v-model="menuVisible" class="app__menu">
            <div class="app__menu-content">
                <div>top</div>
                <div v-for="i in 100" :key="i">{{ i }}</div>
                <div>bottom</div>
            </div>
        </T3TopbarLayoutMenu>
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
        <T3TopbarLayoutFooter v-if="currentFooterData" class="app__footer">
            <pre>{{ currentFooterData.content }}</pre>
            <button @click="showBanner">Cookies</button>
        </T3TopbarLayoutFooter>
    </T3TopbarLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
    useT3ColorScheme,
    useT3Cookiebot,
    useT3Data,
    useT3LoadingState,
    useT3Util,
} from '#imports'
import colors from '@/colors'

const HEADER_HEIGHT = '5rem'
const HEADER_HEIGHT_DENSE = '3rem'

const { showBanner } = useT3Cookiebot()
const { currentFooterData } = useT3Data()
const loading = useT3LoadingState()
const { detectScrollEnd } = useT3Util()

const colorScheme = useT3ColorScheme({
    dark: {
        background: colors.black,
        font: colors.white,
    },
    light: {
        background: colors.white,
        font: colors.black,
        footer: {
            background: colors.secondary,
        },
        header: {
            border: colors.secondary,
        },
        loadingBar: colors.secondary,
        menu: {
            background: colors.primary,
            border: colors.accent,
        },
    },
})

const menuVisible = ref(false)
const scrollbarDisabled = ref(false)
const headerHeight = ref(HEADER_HEIGHT)

onMounted(() => {
    detectScrollEnd(document.body, 'top', (detached) => {
        headerHeight.value = detached ? HEADER_HEIGHT_DENSE : HEADER_HEIGHT
    })
})
</script>
<style lang="scss">
.app {
    position: relative;
    color: v-bind('colorScheme.font');
    display: flex;
    flex-direction: column;

    &__loading-bar {
        position: absolute;
        background-color: v-bind('colorScheme.background');
        height: 0;
        width: 100%;

        &--visible {
            height: 0.125rem;
        }
    }

    &__loading-progress {
        position: absolute;
        inset: 0 100% 0 0;
        background-color: v-bind('colorScheme.loadingBar');
        animation: loading 2s linear infinite;
    }

    &__header {
        background-color: v-bind('colorScheme.background');
        height: v-bind(headerHeight);
        transition: height 0.5s;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.125rem v-bind('colorScheme.header?.border') solid;
        width: 100%;
    }

    &__footer {
        background-color: v-bind('colorScheme.footer?.background');
        color: v-bind('colorScheme.background');
    }

    &__menu {
        margin-top: v-bind(headerHeight);
        width: 100%;
        height: calc(100% - v-bind(headerHeight));
        overflow: auto;
    }

    &__menu-content {
        background-color: v-bind('colorScheme.menu?.background');
        border-bottom: solid 1rem v-bind('colorScheme.menu?.border');
        box-sizing: border-box;
    }

    &__content {
        overflow-x: hidden;
        position: relative;
        background-color: v-bind('colorScheme.background');
        flex-grow: 1;
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
