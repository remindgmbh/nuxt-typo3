<template>
    <nav class="t3-pagination">
        <ul class="t3-pagination__items">
            <li
                v-if="!disableNavigation"
                class="t3-pagination__item t3-pagination__item--prev"
            >
                <T3Link
                    :aria-label="ariaLabelPrevPage"
                    class="t3-pagination__link t3-pagination__link--prev"
                    :class="{
                        't3-pagination__link--disabled': !pagination.prev,
                    }"
                    :to="pagination.prev"
                >
                    <slot name="prev"></slot>
                </T3Link>
            </li>
            <li
                v-for="(page, index) in pages"
                :key="page.link"
                class="t3-pagination__item t3-pagination__item--page"
            >
                <T3Link
                    :aria-current="page.active ? 'page' : undefined"
                    :aria-label="ariaLabelPage(page)"
                    class="t3-pagination__link t3-pagination__link--page"
                    :class="{
                        't3-pagination__link--disabled': page.active,
                    }"
                    :disabled="page.active"
                    :to="page.link"
                >
                    <slot name="page" :page="page">{{ page.pageNumber }}</slot>
                </T3Link>
                <slot v-if="showDivider(index)" name="divider"></slot>
            </li>
            <li
                v-if="!disableNavigation"
                class="t3-pagination__item t3-pagination__item--next"
            >
                <T3Link
                    :aria-label="ariaLabelNextPage"
                    class="t3-pagination__link t3-pagination__link--next"
                    :class="{
                        't3-pagination__link--disabled': !pagination.next,
                    }"
                    :to="pagination.next"
                >
                    <slot name="next"></slot>
                </T3Link>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { type T3Model, useT3Pagination } from '#imports'
import { toRef } from 'vue'

const props = withDefaults(
    defineProps<{
        ariaLabelNextPage?: string
        ariaLabelPage?: (page: T3Model.Typo3.Extbase.PaginationPage) => string
        ariaLabelPrevPage?: string
        disableNavigation?: boolean
        numberOfPages?: number
        pagination: T3Model.Typo3.Extbase.Pagination
    }>(),
    {
        ariaLabelNextPage: undefined,
        ariaLabelPage: () => '',
        ariaLabelPrevPage: undefined,
        numberOfPages: undefined,
    },
)

const { pages, showDivider } = useT3Pagination(
    toRef(() => props.pagination),
    toRef(() => props.numberOfPages),
)
</script>

<style lang="scss">
.t3-pagination {
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
}
</style>
