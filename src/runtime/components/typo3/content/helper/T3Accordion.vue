<template>
    <ul class="t3-accordion">
        <li
            v-for="(item, index) in items"
            :key="index"
            class="t3-accordion__item"
        >
            <button
                :id="getButtonId(item)"
                :aria-controls="getContentId(item)"
                :aria-expanded="activeItems.includes(index)"
                class="t3-accordion__button"
                :class="{
                    't3-accordion__button--active': activeItems.includes(index),
                }"
                type="button"
                @click="toggle(index)"
            >
                <slot
                    :active="activeItems.includes(index)"
                    :index="index"
                    :item="item"
                    name="title"
                    >{{ item.header }}</slot
                >
            </button>
            <T3CollapseTransition v-show="!disabledItems.includes(index)">
                <section
                    v-show="activeItems.includes(index)"
                    :id="getContentId(item)"
                    :aria-labelledby="getButtonId(item)"
                    class="t3-accordion__content-wrapper"
                >
                    <div class="t3-accordion__content">
                        <slot
                            :active="activeItems.includes(index)"
                            :index="index"
                            :item="item"
                            name="content"
                        >
                            <T3Text :content="item" />
                        </slot>
                    </div>
                </section>
            </T3CollapseTransition>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { type T3Model, useT3Accordion } from '#imports'

export interface Props {
    id: string
    items: T3Model.Typo3.Content.Item[]
    multiple?: boolean
    initialActiveItems?: number[]
    disabledItems?: number[]
}

const props = withDefaults(defineProps<Props>(), {
    disabledItems: () => [],
    initialActiveItems: () => [],
})

defineSlots<{
    title(props: {
        active: boolean
        index: number
        item: T3Model.Typo3.Content.Item
    }): any
    content(props: {
        active: boolean
        index: number
        item: T3Model.Typo3.Content.Item
    }): any
}>()

const {
    activeItems,
    getContentId,
    getButtonId: getButtonId,
    toggle,
} = useT3Accordion(
    props.id,
    props.initialActiveItems,
    props.disabledItems,
    props.multiple,
)
</script>
