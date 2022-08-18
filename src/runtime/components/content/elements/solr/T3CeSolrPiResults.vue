<template>
    <div class="t3-ce-solr-results">
        <T3SolrSearch :content-element="contentElement" />
        <template v-if="content.data.result.allResultCount">
            <T3Pagination
                v-if="paginationTop"
                class="t3-ce-solr-results__pagination t3-ce-solr-results__pagination--top"
                :pagination="pagination"
            />
            <div class="t3-ce-solr-results__list">
                <T3SolrListItem
                    v-for="item in content.data.result.documents.list"
                    :key="item.url"
                    :list-item="item"
                />
            </div>
            <T3Pagination
                v-if="paginationBottom"
                class="t3-ce-solr-results__pagination t3-ce-solr-results__pagination--bottom"
                :pagination="pagination"
            />
        </template>
        <div v-else class="t3-ce-solr-results__no-results">
            {{ noResultsFound }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Api, useCeSolrPiResults } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.SolrResults>
}>()

const content = computed(() => props.contentElement.content)

const { noResultsFound, pagination, paginationBottom, paginationTop } =
    useCeSolrPiResults(content)
</script>
