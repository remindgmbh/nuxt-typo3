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
import {
    useApiData,
    useApiPath,
    useDynamicComponent,
    usePageHead,
} from '#nuxt-typo3'

const { currentPagePath } = useApiPath()
const { pageData, pageError } = useApiData()

const currentPageData =
    pageData.value[currentPagePath.value] ?? pageError.value?.data

if (currentPageData) {
    usePageHead(currentPageData)
}

const component = useDynamicComponent(
    'T3Bl',
    currentPageData?.appearance.backendLayout
)
</script>
