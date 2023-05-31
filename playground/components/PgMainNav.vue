<template>
    <div class="rlb-main-nav">
        <template v-if="rootPageNavigation">
            <NuxtLink
                class="rlb-main-nav__item"
                :to="rootPageNavigation.link"
                >{{ rootPageNavigation.title }}</NuxtLink
            >
            <template
                v-for="navItem in rootPageNavigation.children"
                :key="navItem.link"
            >
                <NuxtLink
                    v-if="!navItem.children"
                    class="rlb-main-nav__item"
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
            <NuxtLink class="rlb-main-nav__item" to="/static">Static</NuxtLink>
        </template>
    </div>
</template>

<script setup lang="ts">
import {
    computed,
    ref,
    onMounted,
    useT3Menu,
    useT3Theme,
    useT3Navigation,
} from '#imports'

const { rootPageNavigation } = useT3Navigation()
const { triggers, toggle } = useT3Menu()
const { themeOptions } = useT3Theme()
const menuTriggers = ref<HTMLButtonElement[]>([])

const colors = computed(() => themeOptions.value?.additionalData)

onMounted(() => {
    triggers.value = menuTriggers.value
})
</script>

<style lang="scss">
.rlb-main-nav {
    display: flex;
    gap: 1rem;
    padding: 1rem;

    &--column {
        flex-direction: column;
    }

    .router-link-active {
        color: v-bind('colors.primary');
    }
}
</style>
