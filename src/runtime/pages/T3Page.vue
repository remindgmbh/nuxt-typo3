<template>
    <div class="t3-page">
        <component
            :is="component"
            :content="data.content"
            :breadcrumbs="data.breadcrumbs"
        />
    </div>
</template>

<script setup lang="ts">
import { useDynamicComponent } from '#nuxt-typo3/composables/useDynamicComponent'
import { usePageData } from '#nuxt-typo3/composables/usePageData'
import { usePageHead } from '#nuxt-typo3/composables/usePageHead'
import { useTypo3State } from '#nuxt-typo3/composables/useTypo3State'

const { activeLanguage, updateInitialData, setLanguages } = useTypo3State()

const { data } = await usePageData()

usePageHead(data.value)

const newLanguages = data.value.i18n

const newActiveLanguage = newLanguages.find((language) => language.active)

if (activeLanguage.value?.languageId !== newActiveLanguage?.languageId) {
    await updateInitialData()
} else {
    setLanguages(newLanguages)
}

const component = useDynamicComponent(
    'T3Bl',
    data.value.appearance.backendLayout
)
</script>
