<template>
    <div class="t3-ce-accordion">
        <T3Header
            class="t3-ce-accordion__header"
            :content="contentElement.content"
        />
        <T3Accordion :items="contentElement.content.items">
            <template #title="{ item, index }">
                <slot name="title" :item="item" :index="index">
                    {{ item.title }}
                </slot>
            </template>
            <template #content="{ item, index }">
                <slot name="content" :item="item" :index="index">
                    <T3Text :content="item" />
                </slot>
            </template>
        </T3Accordion>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3Content } from '#imports'

const { injectContentElement } = useT3Content()

const contentElement =
    injectContentElement<T3Model.Typo3.Content.Data.Accordion>()
</script>
