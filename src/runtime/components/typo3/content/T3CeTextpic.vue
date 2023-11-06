<template>
    <div class="t3-ce-textpic">
        <T3TextAsset :content="contentElement.content">
            <template #asset="{ asset }">
                <slot name="asset" :asset="asset" />
            </template>
            <template #text>
                <slot name="text" />
            </template>
        </T3TextAsset>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3Content } from '#imports'

const { injectContentElement } = useT3Content()

const contentElement =
    injectContentElement<T3Model.Typo3.Content.Data.Textpic>()
</script>
