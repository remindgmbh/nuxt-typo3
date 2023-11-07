<template>
    <div class="ce-tabs">
        <component
            :is="Header"
            class="ce-tabs__header"
            :content="contentElement.content"
        />
        <component :is="Tabs" :items="contentElement.content.items">
            <template #title="{ item, index }">
                <slot name="title" :item="item" :index="index">
                    {{ item.title }}
                </slot>
            </template>
            <template #content="{ item }">
                <slot name="content" :item="item">
                    <T3Text :content="item" />
                </slot>
            </template>
        </component>
    </div>
</template>

<script setup lang="ts">
import { T3Model, useT3Content, useT3DynamicComponent } from '#imports'
import { T3Header, T3Tabs } from '#components'

const { injectContentElement } = useT3Content()

const contentElement = injectContentElement<T3Model.Typo3.Content.Data.Tabs>()

const Header = useT3DynamicComponent<typeof T3Header>('Header')
const Tabs = useT3DynamicComponent<typeof T3Tabs>('Tabs')
</script>
