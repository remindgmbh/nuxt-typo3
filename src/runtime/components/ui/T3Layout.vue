<template>
    <div
        class="t3-layout"
        :class="{ 't3-layout--detached': detached }"
        @click="closeOnOutsideClick"
    >
        <header ref="headerRef" class="t3-layout__header" :class="headerClass">
            <slot name="header"></slot>
        </header>
        <main class="t3-layout__content" :class="contentClass">
            <slot name="content"></slot>
        </main>
        <footer class="t3-layout__footer" :class="footerClass">
            <slot name="footer"></slot>
        </footer>
        <Transition
            v-bind="menuTransition"
            @after-leave="menuOnAfterLeave"
            @before-enter="menuOnBeforeEnter"
            @before-leave="menuOnBeforeLeave"
        >
            <nav
                v-if="menuActive"
                ref="menuRef"
                class="t3-layout__menu"
                :class="[
                    menuClass,
                    { 't3-layout__menu--full-height': menuFullHeight },
                    {
                        't3-layout__menu--overlap-header': menuOverlapHeader,
                    },
                ]"
            >
                <slot name="menu"></slot>
            </nav>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import {
    ErrorCodes,
    type TransitionProps,
    callWithAsyncErrorHandling,
    getCurrentInstance,
    nextTick,
    onMounted,
    readonly,
    ref,
    watch,
} from 'vue'
import { type FocusTrap, createFocusTrap } from 'focus-trap'
import { useRoute, useT3LayoutInjection, useT3Util } from '#imports'

const props = withDefaults(
    defineProps<{
        contentClass?: string
        footerClass?: string
        headerClass?: string
        menuClass?: string
        menuCloseOnOutsideClick?: boolean
        menuCloseOnRouteChange?: boolean
        menuFullHeight?: boolean
        menuOverlapHeader?: boolean
        menuTransition?: TransitionProps
    }>(),
    {
        contentClass: undefined,
        footerClass: undefined,
        headerClass: undefined,
        menuClass: undefined,
        menuCloseOnRouteChange: true,
        menuTransition: () => ({
            name: 'menu-transition',
        }),
    },
)

enum MenuStatus {
    Entering,
    Leaving,
}

const { detectScrollEnd } = useT3Util()
const { provideMenu, provideScrollbarDisabled, provideDetached } =
    useT3LayoutInjection()

const headerRef = ref<HTMLElement>()
const menuRef = ref<HTMLElement>()
const scrollbarDisabled = ref(false)
const detached = ref(false)
const menuStatus = ref(MenuStatus.Entering)
const menuActive = ref<string | undefined>(undefined)
const focusTrap = ref<FocusTrap>()
const isTrigger = ref(false)

provideScrollbarDisabled(scrollbarDisabled)
provideMenu({
    active: readonly(menuActive),
    close,
    toggle,
})
provideDetached(detached)

onMounted(() => {
    detectScrollEnd(document.body, 'top', (_detached) => {
        detached.value = _detached
    })
})

function closeOnOutsideClick(event: MouseEvent) {
    if (
        props.menuCloseOnOutsideClick &&
        !isTrigger.value &&
        menuActive.value &&
        menuRef.value &&
        !event.composedPath().includes(menuRef.value)
    ) {
        close()
    }
    isTrigger.value = false
}

function close() {
    isTrigger.value = true
    menuActive.value = undefined
}

function toggle(id?: string) {
    isTrigger.value = true
    menuActive.value = menuActive.value === id ? undefined : id
}

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

if (props.menuCloseOnRouteChange) {
    watch(() => useRoute().fullPath, close)
}

watch(menuActive, (value) => {
    if (value) {
        nextTick(() => {
            if (headerRef.value && menuRef.value) {
                focusTrap.value = createFocusTrap(
                    props.menuOverlapHeader
                        ? [menuRef.value]
                        : [headerRef.value, menuRef.value],
                    {
                        initialFocus: false,
                    },
                )
                focusTrap.value.activate()
            }
        })
    } else {
        focusTrap.value?.deactivate()
    }
})
</script>

<style lang="scss">
@use 'sass:map';
@use '#nuxt-typo3/assets/styles/breakpoints' as breakpoints;
@use '#nuxt-typo3/assets/styles/variables' as variables;

.t3-layout {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100vh;

    // two loops are required so dense values always have priority
    @include breakpoints.loop-up using ($breakpoint) {
        $height: map.get(variables.$layout-header-default, $breakpoint);

        @if $height {
            --header-height: #{$height};
        }
    }

    @include breakpoints.loop-up using ($breakpoint) {
        $height: map.get(variables.$layout-header-dense, $breakpoint);

        @if $height {
            &--detached {
                --header-height: #{$height};
            }
        }
    }

    &__header {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 10;
        height: var(--header-height);
    }

    &__content {
        flex-grow: 1;
        margin-top: var(--header-height);
    }

    &__menu {
        z-index: 20;
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
