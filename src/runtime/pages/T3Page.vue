<template>
    <div class="t3-page">
        <component :is="BackendLayoutComponent" :data="data.content" />
    </div>
</template>

<script setup lang="ts">
import { useDynamicComponent } from '../composables/useDynamicComponent'
import { usePageData } from '../composables/usePageData'
import { usePageHead } from '../composables/usePageHead'
import { useTypo3State } from '../composables/useTypo3State'

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

const BackendLayoutComponent = useDynamicComponent(
    'T3Bl',
    data.value.appearance.backendLayout
)
</script>
