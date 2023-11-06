<template>
    <div class="t3-bl-default">
        <div class="t3-bl-default__before-breadcrumbs">
            <T3Col :content-elements="pageData.content.colPos1687238554" />
        </div>
        <nav v-if="breadcrumbsVisible" class="t3-bl-default__breadcrumbs">
            <T3Breadcrumbs
                :breadcrumbs="pageData.breadcrumbs"
                :background-color="
                    pageData.appearance.breadcrumbsBackgroundColor
                "
            />
        </nav>
        <div class="t3-bl-default__main">
            <T3Col :content-elements="pageData.content.colPos0" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { T3Model } from '#imports'

const props = defineProps<{
    pageData: T3Model.Typo3.Page.Data
}>()

const breadcrumbsVisible = computed(() => props.pageData.breadcrumbs.length > 1)
</script>
