<template>
    <div class="t3-page">
        <component
            :is="component"
            v-if="currentPageData"
            :content="currentPageData.content"
            :breadcrumbs="currentPageData.breadcrumbs"
        />
        <T3PageError v-else-if="pageError" :error="pageError" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
    useApiData,
    useApiPath,
    useDynamicComponent,
    usePageHead,
} from '#nuxt-typo3'

const currentPagePath = useApiPath().currentPagePath.value
const { pageData, pageError } = useApiData()

const currentPageData = computed(
    () => pageData.value[currentPagePath] ?? pageError.value?.data
)

if (currentPageData.value) {
    usePageHead(currentPageData.value)
}

const component = useDynamicComponent(
    'T3Bl',
    currentPageData.value?.appearance.backendLayout
)
</script>
