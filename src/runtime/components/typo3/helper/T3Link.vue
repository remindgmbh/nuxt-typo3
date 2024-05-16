<template>
    <NuxtLink
        class="t3-link"
        :target="to?.target"
        :title="to?.title"
        :to="to?.href"
        v-bind="$attrs"
    >
        <slot>{{ to?.linkText }}</slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'

defineProps<{
    to?: T3Model.Typo3.TypoLink
}>()
</script>
