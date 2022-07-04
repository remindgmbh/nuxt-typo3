<template>
    <div class="t3-ce-solr-search">
        <T3Form
            :form-elements="formElements"
            :loading="loading"
            :submit-label="submitLabel"
            @submit="search"
        />
    </div>
</template>

<script setup lang="ts">
import { Api, useCeSolrPiSearch } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<
        Api.Content.SolrSearch | Api.Content.SolrResults
    >
}>()

const { formElements, loading, submitLabel, search } = useCeSolrPiSearch(
    props.contentElement.content
)
</script>
