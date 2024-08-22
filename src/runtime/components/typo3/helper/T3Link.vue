<template>
    <NuxtLink class="t3-link" :target="target" :title="title" :to="href">
        <slot>{{ linkText }}</slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'
import { computed } from 'vue'

const props = defineProps<{
    to?: T3Model.Typo3.TypoLink | string
}>()

const href = computed(
    () => (typeof props.to === 'string' ? props.to : props.to?.href) ?? '',
)

const title = computed(() =>
    typeof props.to !== 'string' ? props.to?.title : undefined,
)

const target = computed(() =>
    typeof props.to !== 'string' ? props.to?.target : undefined,
)

const linkText = computed(() =>
    typeof props.to !== 'string' ? props.to?.linkText : undefined,
)
</script>
