<template>
    <div class="bl-default">
        <div class="bl-default__before-breadcrumbs">
            <T3Col :content-elements="pageData.content.colPos1687238554" />
        </div>
        <nav v-if="breadcrumbsVisible" class="bl-default__breadcrumbs">
            <component
                :is="Breadcrumbs"
                :breadcrumbs="pageData.breadcrumbs"
                :background-color="
                    pageData.appearance.breadcrumbsBackgroundColor
                "
            />
        </nav>
        <div class="bl-default__main">
            <T3Col :content-elements="pageData.content.colPos0" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { T3Model, useT3DynamicComponent } from '#imports'
import { T3Breadcrumbs } from '#components'

const props = defineProps<{
    pageData: T3Model.Typo3.Page.Data
}>()

const Breadcrumbs = useT3DynamicComponent<typeof T3Breadcrumbs>('Breadcrumbs')

const breadcrumbsVisible = computed(() => props.pageData.breadcrumbs.length > 1)
</script>
