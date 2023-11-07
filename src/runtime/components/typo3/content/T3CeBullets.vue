<template>
    <div class="ce-bullets">
        <component
            :is="Header"
            class="ce-bullets__header"
            :content="contentElement.content"
        />
        <component :is="tag" class="ce-bullets__list">
            <li
                v-for="item in contentElement.content.bodytext"
                :key="item"
                class="ce-bullets__item"
            >
                {{ item }}
            </li>
        </component>
    </div>
</template>

<script setup lang="ts">
import {
    T3Model,
    useT3CeBullets,
    useT3Content,
    useT3DynamicComponent,
} from '#imports'
import { T3Header } from '#components'

const { injectContentElement } = useT3Content()

const contentElement =
    injectContentElement<T3Model.Typo3.Content.Data.Bullets>()

const Header = useT3DynamicComponent<typeof T3Header>('Header')

const { tag } = useT3CeBullets(contentElement)
</script>
