<template>
    <div class="t3-news-list-pagination">
        <NuxtLink
            v-if="pagination.prev"
            :to="pagination.prev"
            class="t3-news-list-pagination__link t3-news-list-pagination__link--prev"
        ></NuxtLink>
        <span
            v-else
            class="t3-news-list-pagination__link t3-news-list-pagination__link--prev t3-news-list-pagination__link--disabled"
        ></span>
        <div class="t3-news-list-pagination__pages">
            <template v-for="page in pagination.pages" :key="page.link">
                <span
                    v-if="page.current"
                    class="t3-news-list-pagination__link t3-news-list-pagination__link--disabled"
                    >{{ page.page }}</span
                >
                <NuxtLink
                    v-else
                    class="t3-news-list-pagination__link"
                    :to="page.link"
                    >{{ page.page }}</NuxtLink
                >
            </template>
        </div>
        <NuxtLink
            v-if="pagination.next"
            :to="pagination.next"
            class="t3-news-list-pagination__link t3-news-list-pagination__link--next"
        ></NuxtLink>
        <span
            v-else
            class="t3-news-list-pagination__link t3-news-list-pagination__link--next t3-news-list-pagination__link--disabled"
        ></span>
    </div>
</template>

<script setup lang="ts">
import { Api } from '#nuxt-typo3'

defineProps<{
    pagination: Api.Content.News.Pagination
}>()
</script>

<style lang="scss">
.t3-news-list-pagination {
    display: flex;
    justify-content: space-between;

    &__link {
        &--prev {
            &::before {
                content: '<';
            }
        }

        &--next {
            &::before {
                content: '>';
            }
        }
    }
}
</style>
