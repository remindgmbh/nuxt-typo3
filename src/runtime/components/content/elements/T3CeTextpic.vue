<template>
    <div
        class="t3-ce-textpic"
        :class="{
            [`t3-ce-textpic--${contentElement.appearance.backgroundColor}`]:
                contentElement.appearance.backgroundColor,
        }"
    >
        <T3TextAsset
            :content-element="contentElement"
            :asset-attrs="assetAttrs"
        />
    </div>
</template>

<script setup lang="ts">
import { T3Api, useT3CeTextpic } from '#imports'

const props = defineProps<{
    contentElement: T3Api.ContentElement<T3Api.Content.Textpic>
    assetAttrs?: { [key: string]: any }
}>()

const { textmediaContentElement: contentElement } = useT3CeTextpic(
    props.contentElement
)
</script>
