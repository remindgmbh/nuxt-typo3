<template>
    <NuxtLink :to="to.href" :target="to.target">
        <slot>{{ to.title }}</slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import { TypoLink } from '#nuxt-typo3'

defineProps<{
    to: TypoLink
}>()
</script>
