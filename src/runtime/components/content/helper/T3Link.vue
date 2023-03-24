<template>
    <NuxtLink
        class="t3-link"
        :to="to.href"
        :target="to.target"
        :title="to.title"
    >
        <slot>{{ to.title }}</slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import { T3Api } from '#nuxt-typo3'

defineProps<{
    to: T3Api.TypoLink
}>()
</script>
