<template>
    <div class="pg-meta-nav">
        <NuxtLink
            v-for="language in availableLanguages"
            :key="language.link"
            :to="language.link"
            >{{ language.navigationTitle }}</NuxtLink
        >
        <button @click="toggleMenu">Toggle Menu</button>
        <button @click="toggleScrollbar">Toggle Scrollbar</button>
        <button @click="toggleTheme">
            {{ selectedTheme }}
        </button>
        <button v-if="isLoggedIn" @click="logout">Logout</button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useT3Languages, useT3UserState, useT3Theme } from '#imports'

const props = defineProps<{
    menuVisible: boolean
    scrollbarDisabled: boolean
}>()

const emit = defineEmits<{
    (e: 'update:menuVisible', value?: boolean): void
    (e: 'update:scrollbarDisabled', value?: boolean): void
}>()

const { availableLanguages } = useT3Languages()
const { isLoggedIn, logout } = useT3UserState()
const { selectedTheme } = useT3Theme()

const menuVisible = computed({
    get() {
        return props.menuVisible
    },
    set(value: boolean) {
        emit('update:menuVisible', value)
    },
})

const scrollbarDisabled = computed({
    get() {
        return props.scrollbarDisabled
    },
    set(value: boolean) {
        emit('update:scrollbarDisabled', value)
    },
})

function toggleMenu(): void {
    menuVisible.value = !menuVisible.value
}

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
