<template>
    <div class="t3-page">
        <component
            :is="BackendLayout"
            v-if="currentPageData"
            :page-data="currentPageData"
        />
        <T3PageError
            v-else
            :error="pageError ?? { statusText: t('unexpectedError') }"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
    useRoute,
    useT3Data,
    useT3DynamicComponent,
    useT3PageHead,
} from '#imports'
import { T3BlDefault } from '#components'
import { onBeforeRouteUpdate } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// when the route changes the old page remains visible until the new page is loaded
// using the computed currentPagePath the old page content is not available anymore
// so currentPagePath is only set during created hook and when only the route query
// params (e.g. for solr) change
const currentPagePath = ref<string>(useRoute().fullPath)
const { pageData, pageError } = useT3Data()

const currentPageData = computed(
    () => pageData.value[currentPagePath.value] ?? pageError.value?.data,
)

if (currentPageData.value) {
    useT3PageHead(currentPageData.value)
}

const BackendLayout = useT3DynamicComponent(
    currentPageData.value?.appearance.backendLayout,
    'Bl',
    T3BlDefault,
)

onBeforeRouteUpdate((to, from) => {
    if (from.path === to.path) {
        currentPagePath.value = to.fullPath
    }
})
</script>
