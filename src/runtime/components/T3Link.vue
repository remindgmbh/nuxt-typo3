<template>
    <NuxtLink :to="props.to.href" :target="props.to.target">
        <slot>{{ props.to.title }}</slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import { TypoLink } from '../api'

const props = defineProps<{
    to: TypoLink
}>()
</script>
