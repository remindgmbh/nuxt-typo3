<template>
    <T3BlDefault :page-data="pageData" />
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    pageData: T3Model.Typo3.Page.Data
}>()
</script>
