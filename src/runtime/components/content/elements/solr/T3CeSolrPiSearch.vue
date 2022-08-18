<template>
    <div class="t3-ce-solr-search">
        <T3SolrSearch :content-element="contentElement" />
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    contentElement: Api.ContentElement<
        Api.Content.SolrSearch | Api.Content.SolrResults
    >
}>()
</script>
