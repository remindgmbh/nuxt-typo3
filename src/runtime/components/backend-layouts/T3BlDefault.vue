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
        <footer class="t3-bl-default__footer">
            <T3Renderer :content-elements="props.content.colPos2" />
        </footer>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Api } from '#nuxt-typo3'

const props = defineProps<{
    content: { [colPos: string]: Api.ContentElement[] }
    breadcrumbs: Api.Breadcrumb[]
}>()

const breadcrumbsVisible = computed(() => props.breadcrumbs.length > 1)
</script>
