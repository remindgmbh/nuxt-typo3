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
import { useT3Data, useT3DynamicComponent, useT3PageHead } from '#imports'
import { T3BlDefault } from '#components'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { currentPageData, pageError } = useT3Data()

const pageData = computed(() => currentPageData.value ?? pageError.value?.data)

if (pageData.value) {
    useT3PageHead(pageData.value)
}

const BackendLayout = useT3DynamicComponent(
    pageData.value?.appearance.backendLayout,
    'Bl',
    T3BlDefault,
)
</script>
