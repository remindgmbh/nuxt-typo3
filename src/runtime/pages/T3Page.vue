<template>
    <div class="page">
        <component
            :is="BackendLayout"
            v-if="currentPageData"
            :page-data="currentPageData"
        />
        <component
            :is="PageError"
            v-else
            :error="pageError ?? { statusText: t('unexpectedError') }"
        />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import {
    useT3ApiData,
    useT3ApiPath,
    useT3DynamicComponent,
    useT3PageHead,
} from '#imports'
import { T3PageError } from '#components'

const { t } = useI18n()

// when the route changes the old page remains visible until the new page is loaded
// using the computed currentPagePath the old page content is not available anymore
// so currentPagePath is only set during created hook and when only the route query
// params (e.g. for solr) change
const currentPagePath = ref<string>(useT3ApiPath().currentPagePath.value)
const { pageData, pageError } = useT3ApiData()

const currentPageData = computed(
    () => pageData.value[currentPagePath.value] ?? pageError.value?.data,
)

if (currentPageData.value) {
    useT3PageHead(currentPageData.value)
}

const BackendLayout = useT3DynamicComponent(
    currentPageData.value?.appearance.backendLayout,
    'Bl',
)

const PageError = useT3DynamicComponent<typeof T3PageError>('PageError')

onBeforeRouteUpdate((to, from) => {
    if (from.path === to.path) {
        currentPagePath.value = to.fullPath
    }
})
</script>
