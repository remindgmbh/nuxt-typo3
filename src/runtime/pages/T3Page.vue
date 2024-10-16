<template>
    <div class="t3-page">
        <component :is="BackendLayout" v-if="pageData" :page-data="pageData" />
        <T3PageError
            v-else
            :error="pageError ?? { statusText: t('unexpectedError') }"
        />
    </div>
</template>

<script setup lang="ts">
import {
    useHead,
    useT3Data,
    useT3DynamicComponent,
    useT3Languages,
} from '#imports'
import type { MetaObject } from '@nuxt/schema'
import { T3BlDefault } from '#components'
import { computed } from 'vue'
import defu from 'defu'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { currentPageData, pageError } = useT3Data()
const { activeLanguage } = useT3Languages()

const pageData = computed(() => currentPageData.value ?? pageError.value?.data)

if (pageData.value) {
    const headData: MetaObject = defu(
        {
            htmlAttrs: {
                lang: activeLanguage.value?.twoLetterIsoCode,
            },
        },
        pageData.value.seo,
    )

    useHead(headData)
}

const BackendLayout = useT3DynamicComponent(
    pageData.value?.appearance.backendLayout,
    'Bl',
    T3BlDefault,
)
</script>
