<template>
    <T3Layout
        class="app"
        content-class="app__content"
        footer-class="app__footer"
        header-class="app__header"
        :header-height-default="headerHeightDefault"
        :header-height-dense="headerHeightDense"
        menu-class="app__menu"
        menu-full-height
    >
        <template #header>
            <PgMainNav />
            <PgMetaNav />
            <PgDropdown />
        </template>
        <template #content>
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
        </template>
        <template #menu>
            <PgMenu />
        </template>
        <template #footer>
            <pre>{{ footer }}</pre>
            <button @click="showBanner">Cookies</button>
        </template>
    </T3Layout>
</template>

<script setup lang="ts">
import {
    useT3ColorScheme,
    useT3Cookiebot,
    useT3Footer,
    useT3LoadingState,
} from '#imports'
import colors from '@/colors'

const headerHeightDefault = '6rem'
const headerHeightDense = '3rem'

const { showBanner } = useT3Cookiebot()
const footer = useT3Footer()
const loading = useT3LoadingState()

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
    },
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
        transition: height 0.5s;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.125rem v-bind('colorScheme.header?.border') solid;
        width: 100%;
    }

    &__content {
        overflow-x: hidden;
        position: relative;
        transition: margin 0.5s;
        background-color: v-bind('colorScheme.background');
    }

    &__footer {
        background-color: v-bind('colorScheme.footer?.background');
        color: v-bind('colorScheme.background');
    }

    .menu-transition {
        &-enter-active,
        &-leave-active {
            transition: transform 2s;
        }

        &-enter-from {
            transform: translateX(100%);
        }

        &-leave-to {
            transform: translateX(100%);
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
