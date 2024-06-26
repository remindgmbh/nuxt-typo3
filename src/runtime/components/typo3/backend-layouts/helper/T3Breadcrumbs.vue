<template>
    <div class="t3-breadcrumbs">
        <div class="t3-breadcrumbs__container" :class="{ container }">
            <div
                class="t3-breadcrumbs__overlay-left"
                :class="{ 't3-breadcrumbs__overlay-left--visible': !left }"
            ></div>
            <div
                class="t3-breadcrumbs__overlay-right"
                :class="{
                    't3-breadcrumbs__overlay-right--visible': !right,
                }"
            ></div>
            <div ref="viewport" class="t3-breadcrumbs__viewport">
                <div ref="content" class="t3-breadcrumbs__content">
                    <template
                        v-for="breadcrumb in breadcrumbs"
                        :key="breadcrumb.link"
                    >
                        <span
                            v-if="breadcrumb.current"
                            class="t3-breadcrumbs__link t3-breadcrumbs__link--disabled"
                            >{{ breadcrumb.title }}</span
                        >
                        <NuxtLink
                            v-else
                            class="t3-breadcrumbs__link"
                            :target="breadcrumb.target"
                            :to="breadcrumb.link"
                            >{{ breadcrumb.title }}</NuxtLink
                        >
                        <span
                            v-if="!breadcrumb.current"
                            class="t3-breadcrumbs__divider"
                        ></span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type T3Model, useT3Config, useT3Theme, useT3Util } from '#imports'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
    pageData: T3Model.Typo3.Page.Data
}>()

const config = useT3Config()
const { backgroundColors } = useT3Theme()
const { detectScrollEnd } = useT3Util()

const viewport = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()
const left = ref(true)
const right = ref(true)

const container = computed(() => !config.breadcrumbs.fullWidth)

const backgroundColor = computed<string | undefined>(
    () =>
        backgroundColors.value?.[
            props.pageData.appearance.breadcrumbsBackgroundColor
        ],
)

const breadcrumbs = computed(() => {
    const result = props.pageData.breadcrumbs

    if (config.breadcrumbs.currentTitle) {
        const currentIndex = result.findIndex(
            (breadcrumb) => breadcrumb.current,
        )
        if (currentIndex >= 0) {
            const currentTitle =
                config.breadcrumbs.currentTitle instanceof Function
                    ? config.breadcrumbs.currentTitle(props.pageData)
                    : config.breadcrumbs.currentTitle
            if (currentTitle) {
                result[currentIndex].title = currentTitle
            }
        }
    }

    return result
})

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
.t3-breadcrumbs {
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
