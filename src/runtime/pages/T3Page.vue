<template>
    <div class="t3-page">
        <component
            :is="component"
            v-if="pageResponse.data"
            :content="pageResponse.data.content"
            :breadcrumbs="pageResponse.data.breadcrumbs"
        />
        <T3PageError
            v-else
            :message="pageResponse.errorMessage!"
            :response="pageResponse.errorResponse"
        />
    </div>
</template>

<script setup lang="ts">
import { useDynamicComponent } from '#nuxt-typo3/composables/useDynamicComponent'
import { usePage } from '#nuxt-typo3/composables/usePage'
import { useInitialData } from '#nuxt-typo3/composables/useInitialData'

const { activeLanguage, updateInitialData, setLanguages } = useInitialData()
const { getPageData, setPageHead } = usePage()

const pageResponse = await getPageData()

if (pageResponse.data) {
    setPageHead(pageResponse.data)

    const newLanguages = pageResponse.data.i18n

    const newActiveLanguage = newLanguages.find((language) => language.active)

    if (activeLanguage.value?.languageId !== newActiveLanguage?.languageId) {
        await updateInitialData()
    } else {
        setLanguages(newLanguages)
    }
}

const component = useDynamicComponent(
    'T3Bl',
    pageResponse.data?.appearance.backendLayout
)
</script>
