<template>
    <div class="t3-news-list">
        <T3CeHeader :content-element="contentElement" />
        <T3NewsListPagination
            v-if="pagination && paginationTop"
            :pagination="pagination"
        />
        <div class="t3-news-list__elements">
            <T3NewsListElement
                v-for="listElement in listElements"
                :key="listElement.uid"
                :list-element="listElement"
            />
        </div>
        <T3NewsListPagination
            v-if="pagination && paginationBottom"
            :pagination="pagination"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Api, useConfig } from '#nuxt-typo3'

const config = useConfig()

const props = defineProps<{
    contentElement: Api.ContentElement<Api.Content.NewsPi>
}>()

const listElements = computed(
    () => props.contentElement.content.data.list ?? []
)
const pagination = computed(() => props.contentElement.content.data.pagination)

const paginationTop = computed(() =>
    ['top', 'both'].includes(config.news.pagination.position)
)

const paginationBottom = computed(() =>
    ['bottom', 'both'].includes(config.news.pagination.position)
)
</script>
