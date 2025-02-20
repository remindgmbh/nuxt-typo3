<template>
    <NuxtLink
        :aria-current="ariaCurrent"
        class="t3-link"
        :target="target"
        :title="title"
        :to="disabled ? undefined : href"
    >
        <slot>{{ linkText }}</slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { T3Model } from '#imports'
import { computed } from 'vue'

export interface Props {
    // define explicitly because NuxtLink/RouterLink sets aria-current depending on active state without considering query
    ariaCurrent?: Element['ariaCurrent']
    disabled?: boolean
    to?: T3Model.Typo3.TypoLink | string
}

const props = defineProps<Props>()

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
