<template>
    <div class="t3-page">
        <component
            :is="component"
            v-if="pageData"
            :content="pageData.content"
            :breadcrumbs="pageData.breadcrumbs"
        />
        <T3PageError v-else-if="pageError" :error="pageError" />
    </div>
</template>

<script setup lang="ts">
import { useApiData, useDynamicComponent, usePageHead } from '#nuxt-typo3'

const { pageData, pageError, updatePageData } = await useApiData()

// shouldn't be necessary because page updates on route change,
// but without update data is always one page behind
await updatePageData()

if (pageData.value) {
    usePageHead(pageData.value)
}

const component = useDynamicComponent(
    'T3Bl',
    pageData.value?.appearance.backendLayout
)
</script>
