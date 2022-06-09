<template>
    <NuxtLink :to="to.href" :target="to.target">
        <slot>{{ to.title }}</slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    to: Api.TypoLink
}>()
</script>
