<template>
    <ul class="t3-accordion">
        <li
            v-for="(item, index) in items"
            :key="getKey(index)"
            class="t3-accordion__item"
        >
            <button
                v-bind="
                    typeof buttonAttrs === 'function'
                        ? buttonAttrs(item)
                        : buttonAttrs
                "
                :id="getButtonId(index)"
                :aria-controls="getContentId(index)"
                :aria-expanded="isActive(index)"
                class="t3-accordion__button"
                :class="{
                    't3-accordion__button--active': isActive(index),
                }"
                type="button"
                @click="toggle(index)"
            >
                <slot
                    :active="isActive(index)"
                    :index="index"
                    :item="item"
                    name="title"
                ></slot>
            </button>
            <T3CollapseTransition v-show="!disabledItems.includes(index)">
                <section
                    v-show="isActive(index)"
                    :id="getContentId(index)"
                    :aria-labelledby="getButtonId(index)"
                    class="t3-accordion__content-wrapper"
                >
                    <div class="t3-accordion__content">
                        <slot
                            :active="isActive(index)"
                            :index="index"
                            :item="item"
                            name="content"
                        >
                        </slot>
                    </div>
                </section>
            </T3CollapseTransition>
        </li>
    </ul>
</template>

<script setup lang="ts" generic="T">
import { toRef, useId, useT3Accordion } from '#imports'

export interface Props<T> {
    buttonAttrs?:
        | Record<string, unknown>
        | ((item: T) => Record<string, unknown>)
    id?: string
    items: T[]
    multiple?: boolean
    initialActiveItems?: number[]
    disabledItems?: number[]
}

export interface Slots<T> {
    title(props: { active: boolean; index: number; item: T }): any
    content(props: { active: boolean; index: number; item: T }): any
}

const props = withDefaults(defineProps<Props<T>>(), {
    buttonAttrs: undefined,
    disabledItems: () => [],
    id: () => useId(),
    initialActiveItems: () => [],
})

defineSlots<Slots<T>>()

const { getContentId, getButtonId, getKey, isActive, toggle } = useT3Accordion(
    toRef(() => props.id),
    toRef(() => props.initialActiveItems),
    toRef(() => props.disabledItems),
    toRef(() => props.multiple),
)
</script>
