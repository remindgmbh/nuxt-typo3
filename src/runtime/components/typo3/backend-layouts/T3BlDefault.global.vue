<template>
    <div class="t3-bl-default">
        <div class="t3-bl-default__before-breadcrumbs">
            <T3Col :content-elements="pageData.content.colPos1687238554" />
        </div>
        <div v-if="breadcrumbsVisible" class="t3-bl-default__breadcrumbs">
            <T3Breadcrumbs :page-data="pageData" />
        </div>
        <div class="t3-bl-default__main">
            <T3Col :content-elements="pageData.content.colPos0" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { T3Breadcrumbs } from '#components'
import { type T3Model } from '#imports'
import { computed } from 'vue'

const props = defineProps<{
    pageData: T3Model.Typo3.Page
}>()

const breadcrumbsVisible = computed(() => props.pageData.breadcrumbs.length > 1)
</script>
