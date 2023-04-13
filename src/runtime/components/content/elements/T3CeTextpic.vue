<template>
    <div
        class="t3-ce-textpic"
        :class="{
            [`t3-ce-textpic--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3TextAsset
            :content="contentElement.content"
            :asset-attrs="assetAttrs"
        />
    </div>
</template>

<script setup lang="ts">
import { T3Model } from '#imports'

defineProps<{
    contentElement: T3Model.Typo3.Content.Element<T3Model.Typo3.Content.Data.Textpic>
    assetAttrs?: { [key: string]: any }
}>()
</script>
