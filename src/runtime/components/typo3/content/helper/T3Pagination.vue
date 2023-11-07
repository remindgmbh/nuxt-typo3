<template>
    <div class="pagination">
        <NuxtLink
            v-if="pagination.prev"
            :to="pagination.prev"
            class="pagination__link pagination__link--prev"
        ></NuxtLink>
        <span
            v-else
            class="pagination__link pagination__link--prev pagination__link--disabled"
        ></span>
        <div class="pagination__pages">
            <template v-for="page in pagination.pages" :key="page.link">
                <span
                    v-if="page.active"
                    class="pagination__link pagination__link--disabled"
                    >{{ page.pageNumber }}</span
                >
                <NuxtLink v-else class="pagination__link" :to="page.link">{{
                    page.pageNumber
                }}</NuxtLink>
            </template>
        </div>
        <NuxtLink
            v-if="pagination.next"
            :to="pagination.next"
            class="pagination__link pagination__link--next"
        ></NuxtLink>
        <span
            v-else
            class="pagination__link pagination__link--next pagination__link--disabled"
        ></span>
    </div>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    pagination: T3Model.Typo3.Extbase.Pagination
}>()
</script>
