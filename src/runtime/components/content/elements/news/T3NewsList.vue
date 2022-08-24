<template>
    <div class="t3-news-list">
        <T3Header :content-element="contentElement" />
        <T3Pagination
            v-if="pagination && paginationTop"
            class="t3-news-list__pagination t3-news-list__pagination--top"
            :pagination="pagination"
        />
        <div class="t3-news-list__elements">
            <T3NewsListElement
                v-for="listElement in listElements"
                :key="listElement.uid"
                :list-element="listElement"
            />
        </div>
        <T3Pagination
            v-if="pagination && paginationBottom"
            class="t3-news-list__pagination t3-news-list__pagination--bottom"
            :pagination="pagination"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Api, useNewsList } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.NewsPiList>
}>()

const content = computed(() => props.contentElement.content)

const { listElements, pagination, paginationBottom, paginationTop } =
    useNewsList(content)
</script>
