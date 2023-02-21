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
import { computed, ref, watch } from 'vue'
import { useRoute } from '#app'
import { useI18n } from 'vue-i18n'
import { useT3ApiData } from '#nuxt-typo3/composables/useT3ApiData'
import { useT3ApiPath } from '#nuxt-typo3/composables/useT3ApiPath'
import { useT3DynamicComponent } from '#nuxt-typo3/composables/useT3DynamicComponent'
import { useT3PageHead } from '#nuxt-typo3/composables/useT3PageHead'

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
