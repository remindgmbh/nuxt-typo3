<template>
    <div class="t3-bl-default">
        <!-- <div class="t3-bl-default__before-breadcrumbs">
            {{ props.data.colPos1 }}
        </div> -->
        <div class="t3-bl-default__main">
            <T3Renderer :content-elements="props.data.colPos0" />
        </div>
        <!-- <div class="t3-bl-default__footer">{{ props.data.colPos2 }}</div> -->
    </div>
</template>

<script setup lang="ts">
import { ContentElement } from '#nuxt-typo3/api'

const props = defineProps<{
    data: { [colPos: string]: ContentElement[] }
}>()
</script>
