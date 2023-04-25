<template>
    <div class="t3-page">
        <component
            :is="component"
            v-if="currentPageData"
            :content="currentPageData.content"
            :breadcrumbs="currentPageData.breadcrumbs"
        />
        <T3PageError
            v-else
            :error="pageError ?? { statusText: t('unexpectedError') }"
        />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref, watch } from 'vue'
import {
    useRoute,
    useT3ApiData,
    useT3ApiPath,
    useT3DynamicComponent,
    useT3PageHead,
} from '#imports'

const { t } = useI18n()

// when the route changes the old page remains visible until the new page is loaded
// using the computed currentPagePath the old page content is not available anymore
// so currentPagePath is only set during created hook and when only the route query
// params (e.g. for solr) change
const currentPagePath = ref<string>(useT3ApiPath().currentPagePath.value)
const { pageData, pageError } = useT3ApiData()
const route = useRoute()

const currentPageData = computed(
    () => pageData.value[currentPagePath.value] ?? pageError.value?.data
)

if (currentPageData.value) {
    useT3PageHead(currentPageData.value)
}

const component = useT3DynamicComponent(
    'T3Bl',
    currentPageData.value?.appearance.backendLayout
)

watch(
    () => ({ ...route }),
    (value, oldValue) => {
        if (value.path === oldValue.path) {
            currentPagePath.value = value.fullPath
        }
    }
)
</script>
