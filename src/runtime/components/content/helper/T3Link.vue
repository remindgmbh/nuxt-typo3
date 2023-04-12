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
import { T3Model } from '#imports'

defineProps<{
    to: T3Model.Typo3.TypoLink
}>()
</script>
