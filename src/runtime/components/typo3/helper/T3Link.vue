<template>
    <NuxtLink
        class="link"
        :to="to?.href"
        :target="to?.target"
        :title="to?.title"
        v-bind="$attrs"
    >
        <slot>{{ to?.title }}</slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    to?: T3Model.Typo3.TypoLink
}>()
</script>
