<template>
    <div class="t3-pagination">
        <NuxtLink
            v-if="pagination.prev"
            :to="pagination.prev"
            class="t3-pagination__link t3-pagination__link--prev"
        ></NuxtLink>
        <span
            v-else
            class="t3-pagination__link t3-pagination__link--prev t3-pagination__link--disabled"
        ></span>
        <div class="t3-pagination__pages">
            <template v-for="page in pagination.pages" :key="page.link">
                <span
                    v-if="page.current"
                    class="t3-pagination__link t3-pagination__link--disabled"
                    >{{ page.pageNumber }}</span
                >
                <NuxtLink v-else class="t3-pagination__link" :to="page.link">{{
                    page.pageNumber
                }}</NuxtLink>
            </template>
        </div>
        <NuxtLink
            v-if="pagination.next"
            :to="pagination.next"
            class="t3-pagination__link t3-pagination__link--next"
        ></NuxtLink>
        <span
            v-else
            class="t3-pagination__link t3-pagination__link--next t3-pagination__link--disabled"
        ></span>
    </div>
</template>

<script setup lang="ts">
import { Model } from '#nuxt-typo3'

defineProps<{
    pagination: Model.Pagination
}>()
</script>

<style lang="scss">
.t3-pagination {
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
