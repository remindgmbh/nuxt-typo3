<template>
    <div class="t3-bl-default">
        <div class="t3-bl-default__before-breadcrumbs">
            <T3Renderer :content-elements="props.content.colPos1" />
        </div>
        <nav v-if="breadcrumbsVisible" class="t3-bl-default__breadcrumbs">
            <T3Breadcrumbs :breadcrumbs="props.breadcrumbs" />
        </nav>
        <div class="t3-bl-default__main">
            <T3Renderer :content-elements="props.content.colPos0" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, T3Model } from '#imports'

const props = defineProps<{
    content: { [colPos: string]: T3Model.Typo3.Content.Element[] }
    breadcrumbs: T3Model.Typo3.Breadcrumb[]
}>()

const breadcrumbsVisible = computed(() => props.breadcrumbs.length > 1)
</script>
