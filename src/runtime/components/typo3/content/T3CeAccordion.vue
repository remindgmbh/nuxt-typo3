<template>
    <div class="ce-accordion">
        <component
            :is="Header"
            class="ce-accordion__header"
            :content="contentElement.content"
        />
        <component :is="Accordion" :items="contentElement.content.items">
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
        </component>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3Content, useT3DynamicComponent } from '#imports'
import { T3Accordion, T3Header } from '#components'

const { injectContentElement } = useT3Content()

const contentElement =
    injectContentElement<T3Model.Typo3.Content.Data.Accordion>()

const Header = useT3DynamicComponent<typeof T3Header>('Header')
const Accordion = useT3DynamicComponent<typeof T3Accordion>('Accordion')
</script>
