<template>
    <component :is="BackendLayoutComponent" :data="pageData.content" />
</template>

<script setup lang="ts">
import { usePageHead } from '../composables/usePageHead'

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
