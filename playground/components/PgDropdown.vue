<template>
    <T3CollapseTransition transition-name="menu-collapse-transition">
        <div v-if="activeNavItem" class="pg-dropdown">
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
import {
    useT3ColorScheme,
    useT3Navigation,
    useT3TopbarLayoutInjection,
} from '#imports'
import colors from '@/colors'
import { computed } from 'vue'

const { injectMenu } = useT3TopbarLayoutInjection()
const { navItemsWithChildren } = useT3Navigation()
const { active } = injectMenu()

const colorScheme = useT3ColorScheme({
    light: {
        background: colors.accent,
        link: colors.primary,
    },
})

const activeNavItem = computed(() =>
    navItemsWithChildren.value.find((item) => item.link === active.value),
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
