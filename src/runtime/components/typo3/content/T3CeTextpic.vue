<template>
    <div class="ce-textpic">
        <component :is="TextAsset" :content="contentElement.content">
            <template #asset="{ asset }">
                <slot name="asset" :asset="asset" />
            </template>
            <template #text>
                <slot name="text" />
            </template>
        </component>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3Content, useT3DynamicComponent } from '#imports'
import { T3TextAsset } from '#components'

const { injectContentElement } = useT3Content()

const contentElement =
    injectContentElement<T3Model.Typo3.Content.Data.Textpic>()

const TextAsset = useT3DynamicComponent<typeof T3TextAsset>('TextAsset')
</script>
