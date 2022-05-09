<template>
    <component :is="BackendLayoutComponent" :data="pageData.content" />
    <!-- <pre>{{ data }}</pre> -->
</template>

<script setup lang="ts">
import { useDynamicComponent } from '../composables/useDynamicComponent'
import { useInitialData } from '../composables/useInitialData'
import { usePageData } from '../composables/usePageData'
import { usePageHead } from '../composables/usePageHead'
import { useTypo3Store } from '../stores/typo3'

const typo3Store = useTypo3Store()

const { data } = await usePageData()
const pageData = data.value

usePageHead(pageData)

const newLanguages = pageData.i18n

const newActiveLanguage = newLanguages.find((language) => language.active)

if (typo3Store.activeLanguage?.languageId !== newActiveLanguage?.languageId) {
    const initialData = await useInitialData()
    typo3Store.setInitialData(initialData)
} else {
    typo3Store.setLanguages(newLanguages)
}

const BackendLayoutComponent = useDynamicComponent(
    'T3Bl',
    pageData.appearance.backendLayout
)
</script>
