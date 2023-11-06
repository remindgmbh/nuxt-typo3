<template>
    <T3CollapseTransition transition-name="menu-collapse-transition">
        <div
            v-if="activeNavItem"
            v-on-click-outside="[close, { ignore: triggers }]"
            class="pg-dropdown"
        >
            <T3AutoHeightContainer class="pg-dropdown__items-wrapper">
                <div class="pg-dropdown__items">
                    <NuxtLink
                        :key="activeNavItem.link"
                        class="pg-dropdown__item"
                        :to="activeNavItem.link"
                        >{{ activeNavItem.title }}</NuxtLink
                    >
                    <NuxtLink
                        v-for="navItem in activeNavItem.children"
                        :key="navItem.link"
                        class="pg-dropdown__item"
                        :to="navItem.link"
                        >{{ navItem.title }}</NuxtLink
                    >
                </div>
            </T3AutoHeightContainer>
        </div>
    </T3CollapseTransition>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import {
    computed,
    useT3Menu,
    useT3Navigation,
    useT3ColorScheme,
} from '#imports'
import colors from '@/colors'

const { active, triggers, close } = useT3Menu()
const { navItemsWithChildren } = useT3Navigation()

const colorScheme = useT3ColorScheme({
    light: {
        background: colors.accent,
        link: colors.primary,
    },
})

const activeNavItem = computed(() =>
    navItemsWithChildren.value.find((item) => item.link === active.value)
)
</script>

<style lang="scss">
.menu-collapse-transition {
    &-enter-active,
    &-leave-active {
        transition: height 0.5s;
    }
}

.pg-dropdown {
    background-color: v-bind('colorScheme.background');
    position: absolute;
    top: 100%;
    width: 100%;

    &__items-wrapper {
        transition: height 0.5s;
    }

    &__items {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        flex-direction: column;

        .router-link-active {
            color: v-bind('colorScheme.link');
        }
    }
}
</style>
