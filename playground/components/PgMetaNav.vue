<template>
    <div class="pg-meta-nav">
        <NuxtLink
            v-for="language in availableLanguages"
            :key="language.link"
            :to="language.link"
            >{{ language.navigationTitle }}</NuxtLink
        >
        <button @click="toggleSidebar">Toggle Sidebar</button>
        <button @click="toggleScrollbar">Toggle Scrollbar</button>
        <button @click="toggleTheme">
            {{ selectedTheme }}
        </button>
        <button v-if="isLoggedIn" @click="logout">Logout</button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    sidebarVisible: boolean
    scrollbarDisabled: boolean
}>()

const emit = defineEmits<{
    (e: 'update:sidebarVisible', value?: boolean): void
    (e: 'update:scrollbarDisabled', value?: boolean): void
}>()

const { availableLanguages } = useT3Languages()
const { isLoggedIn, logout } = useT3UserState()
const { selectedTheme } = useT3Theme()

const sidebarVisible = computed({
    get() {
        return props.sidebarVisible
    },
    set(value: boolean) {
        emit('update:sidebarVisible', value)
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

function toggleSidebar(): void {
    sidebarVisible.value = !sidebarVisible.value
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
