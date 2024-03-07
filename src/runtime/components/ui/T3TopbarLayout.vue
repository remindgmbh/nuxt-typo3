<template>
    <div class="t3-topbar-layout">
        <header class="t3-topbar-layout__header" :class="headerClass">
            <slot name="header"></slot>
        </header>
        <main class="t3-topbar-layout__content" :class="contentClass">
            <slot name="content"></slot>
        </main>
        <footer class="t3-topbar-layout__footer" :class="footerClass">
            <slot name="footer"></slot>
        </footer>
        <transition
            v-bind="menuTransition"
            @after-leave="menuOnAfterLeave"
            @before-enter="menuOnBeforeEnter"
            @before-leave="menuOnBeforeLeave"
        >
            <nav
                v-if="menuVisible"
                class="t3-topbar-layout__menu"
                :class="[
                    menuClass,
                    { 't3-topbar-layout__menu--full-height': menuFullHeight },
                    {
                        't3-topbar-layout__menu--overlap-header':
                            menuOverlapHeader,
                    },
                ]"
            >
                <slot :close="() => (menuVisible = false)" name="menu"></slot>
            </nav>
        </transition>
    </div>
</template>

<script setup lang="ts">
import {
    ErrorCodes,
    type TransitionProps,
    callWithAsyncErrorHandling,
    getCurrentInstance,
    onMounted,
    ref,
    watch,
} from 'vue'
import { useT3TopbarLayoutInjection, useT3Util } from '#imports'

enum MenuStatus {
    Entering,
    Leaving,
}

const props = withDefaults(
    defineProps<{
        contentClass?: string
        footerClass?: string
        headerClass?: string
        headerHeightDefault: string
        headerHeightDense?: string
        menuClass?: string
        menuFullHeight?: boolean
        menuOverlapHeader?: boolean
        menuTransition?: TransitionProps
    }>(),
    {
        contentClass: undefined,
        footerClass: undefined,
        headerClass: undefined,
        headerHeightDense: undefined,
        menuClass: undefined,
        menuTransition: () => ({
            name: 'menu-transition',
        }),
    },
)

const { detectScrollEnd } = useT3Util()
const { provideMenuVisible, provideScrollbarDisabled } =
    useT3TopbarLayoutInjection()

const menuVisible = ref(false)
const scrollbarDisabled = ref(false)
const headerHeight = ref(props.headerHeightDefault)
const menuStatus = ref(MenuStatus.Entering)

provideScrollbarDisabled(scrollbarDisabled)
provideMenuVisible(menuVisible)

onMounted(() => {
    detectScrollEnd(document.body, 'top', (detached) => {
        if (props.headerHeightDense) {
            headerHeight.value = detached
                ? props.headerHeightDense
                : props.headerHeightDefault
        }
    })
})

function callHook(
    el: Element,
    hook?:
        | TransitionProps['onBeforeEnter']
        | TransitionProps['onBeforeLeave']
        | TransitionProps['onAfterLeave'],
) {
    if (hook) {
        callWithAsyncErrorHandling(
            hook,
            getCurrentInstance(),
            ErrorCodes.TRANSITION_HOOK,
            [el],
        )
    }
}

function menuOnBeforeEnter(el: Element): void {
    if (menuStatus.value !== MenuStatus.Leaving) {
        scrollbarDisabled.value = true
    }
    menuStatus.value = MenuStatus.Entering
    callHook(el, props.menuTransition.onBeforeEnter)
}

function menuOnBeforeLeave(el: Element): void {
    menuStatus.value = MenuStatus.Leaving
    callHook(el, props.menuTransition.onBeforeLeave)
}

function menuOnAfterLeave(el: Element): void {
    if (menuStatus.value === MenuStatus.Leaving) {
        scrollbarDisabled.value = false
        menuStatus.value = MenuStatus.Entering
    }
    callHook(el, props.menuTransition.onAfterLeave)
}

watch(scrollbarDisabled, (value) => {
    document.documentElement.style.overflowY = value ? 'hidden' : 'initial'
})
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/breakpoints' as breakpoints;
@use '#nuxt-typo3/assets/styles/variables' as variables;

.t3-topbar-layout {
    --header-height: v-bind('headerHeightDense ?? headerHeight');

    @include breakpoints.up(variables.$topbar-layout-header-dense-breakpoint) {
        --header-height: v-bind(headerHeight);
    }

    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100vh;

    &__header {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1;
        height: var(--header-height);
    }

    &__content {
        flex-grow: 1;
        margin-top: var(--header-height);
    }

    &__menu {
        z-index: 2;
        position: fixed;
        width: 100%;
        max-height: calc(100% - var(--header-height));
        margin-top: var(--header-height);
        overflow: auto;

        &--full-height {
            height: calc(100% - var(--header-height));
        }

        &--overlap-header {
            max-height: 100%;
            margin-top: 0;
        }

        &--full-height#{&}--overlap-header {
            height: 100%;
        }
    }
}
</style>
