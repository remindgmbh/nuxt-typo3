<template>
    <pre>{{ file }}</pre>
</template>

<script setup lang="ts">
import type { T3Model } from '#imports'

export interface Props {
    file: T3Model.Typo3.Asset.Base
}

defineProps<Props>()
</script>
