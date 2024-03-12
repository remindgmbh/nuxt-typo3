<template>
    <div class="pg-meta-nav">
        <NuxtLink
            v-for="language in availableLanguages"
            :key="language.link"
            :to="language.link"
            >{{ language.navigationTitle }}</NuxtLink
        >
        <button @click="toggle('menu')">Toggle Menu</button>
        <button @click="toggleScrollbar">Toggle Scrollbar</button>
        <button @click="toggleTheme">
            {{ selectedTheme }}
        </button>
        <button v-if="isLoggedIn" @click="logout">Logout</button>
    </div>
</template>

<script setup lang="ts">
import {
    useT3Languages,
    useT3LayoutInjection,
    useT3Theme,
    useT3UserState,
} from '#imports'

const { availableLanguages } = useT3Languages()
const { isLoggedIn, logout } = useT3UserState()
const { selectedTheme } = useT3Theme()
const { injectMenu, injectScrollbarDisabled } = useT3LayoutInjection()

const scrollbarDisabled = injectScrollbarDisabled()
const { toggle } = injectMenu()

function toggleScrollbar(): void {
    scrollbarDisabled.value = !scrollbarDisabled.value
}

function toggleTheme(): void {
    selectedTheme.value = selectedTheme.value === 'dark' ? 'light' : 'dark'
}
</script>

<style lang="scss">
.pg-meta-nav {
    display: flex;
    gap: 0.5rem;
}
</style>
