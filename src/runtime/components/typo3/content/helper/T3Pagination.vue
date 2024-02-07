<template>
    <div class="t3-pagination">
        <component
            :is="pagination.prev ? NuxtLink : 'div'"
            v-if="!disableNavigation"
            class="t3-pagination__navigation t3-pagination__navigation--prev"
            :class="{ 't3-pagination__navigation--disabled': !pagination.prev }"
            :to="pagination.prev"
        >
            <slot name="prev"></slot>
        </component>
        <div class="t3-pagination__pages">
            <template v-for="(page, index) in pages" :key="page.link">
                <component
                    :is="page.active ? 'div' : NuxtLink"
                    class="t3-pagination__page"
                    :class="{
                        't3-pagination__page--disabled': page.active,
                    }"
                    :to="page.link"
                >
                    <slot name="page" :page="page">{{ page.pageNumber }}</slot>
                </component>
                <slot v-if="showDivider(index)" name="divider"></slot>
            </template>
        </div>
        <component
            :is="pagination.next ? NuxtLink : 'div'"
            v-if="!disableNavigation"
            class="t3-pagination__navigation t3-pagination__navigation--next"
            :class="{ 't3-pagination__navigation--disabled': !pagination.next }"
            :to="pagination.next"
        >
            <slot name="next"></slot>
        </component>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3Pagination } from '#imports'
import { NuxtLink } from '#components'
import { toRef } from 'vue'

const props = defineProps<{
    disableNavigation?: boolean
    numberOfPages?: number
    pagination: T3Model.Typo3.Extbase.Pagination
}>()

const { pages, showDivider } = useT3Pagination(
    toRef(() => props.pagination),
    toRef(() => props.numberOfPages),
)
</script>
