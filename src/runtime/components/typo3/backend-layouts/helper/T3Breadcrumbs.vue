<template>
    <div class="breadcrumbs">
        <div class="breadcrumbs__container" :class="{ container }">
            <div
                class="breadcrumbs__overlay-left"
                :class="{ 'breadcrumbs__overlay-left--visible': !left }"
            ></div>
            <div
                class="breadcrumbs__overlay-right"
                :class="{
                    'breadcrumbs__overlay-right--visible': !right,
                }"
            ></div>
            <div ref="viewport" class="breadcrumbs__viewport">
                <div ref="content" class="breadcrumbs__content">
                    <template
                        v-for="breadcrumb in props.breadcrumbs"
                        :key="breadcrumb.link"
                    >
                        <span
                            v-if="breadcrumb.current"
                            class="breadcrumbs__link breadcrumbs__link--disabled"
                            >{{ breadcrumb.title }}</span
                        >
                        <NuxtLink
                            v-else
                            class="breadcrumbs__link"
                            :to="breadcrumb.link"
                            :target="breadcrumb.target"
                            >{{ breadcrumb.title }}</NuxtLink
                        >
                        <span
                            v-if="!breadcrumb.current"
                            class="breadcrumbs__divider"
                        ></span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { T3Model, useT3Config, useT3Theme, useT3Util } from '#imports'

const props = defineProps<{
    breadcrumbs: T3Model.Typo3.Breadcrumb[]
    backgroundColor: string
}>()

const config = useT3Config()
const { backgroundColors } = useT3Theme()
const { detectScrollEnd } = useT3Util()

const viewport = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()
const left = ref(true)
const right = ref(true)

const container = computed(() => !config.layout.breadcrumbs.fullWidth)

const backgroundColor = computed<string | undefined>(
    () => backgroundColors.value?.[props.backgroundColor],
)

onMounted(() => {
    if (viewport.value && content.value) {
        detectScrollEnd(
            content.value,
            'left',
            (detached) => (left.value = !detached),
            viewport.value,
        )
        detectScrollEnd(
            content.value,
            'right',
            (detached) => (right.value = !detached),
            viewport.value,
        )
    }
})
</script>

<style lang="scss">
.breadcrumbs {
    background-color: v-bind(backgroundColor);

    &__viewport {
        overflow-x: auto;
        position: relative;
    }

    &__content {
        width: fit-content;
    }

    &__overlay-left,
    &__overlay-right {
        content: '';
        top: 0;
        position: absolute;
        width: 0;
        height: 100%;
        z-index: 1;
        pointer-events: none;
    }

    &__overlay-left {
        left: 0;
    }

    &__overlay-right {
        right: 0;
    }
}
</style>
