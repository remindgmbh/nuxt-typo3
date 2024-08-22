<template>
    <div class="t3-breadcrumbs">
        <div class="t3-breadcrumbs__container" :class="{ container }">
            <div
                class="t3-breadcrumbs__overlay t3-breadcrumbs__overlay--left"
                :class="{ 't3-breadcrumbs__overlay--visible': !left }"
            ></div>
            <div
                class="t3-breadcrumbs__overlay t3-breadcrumbs__overlay--right"
                :class="{
                    't3-breadcrumbs__overlay--visible': !right,
                }"
            ></div>
            <nav
                ref="viewport"
                :aria-label="ariaLabel"
                class="t3-breadcrumbs__viewport"
            >
                <ol ref="content" class="t3-breadcrumbs__content">
                    <template
                        v-for="breadcrumb in breadcrumbs"
                        :key="breadcrumb.link"
                    >
                        <li class="t3-breadcrumbs__item">
                            <T3Link
                                :aria-current="
                                    breadcrumb.current ? 'page' : undefined
                                "
                                class="t3-breadcrumbs__link"
                                :class="{
                                    't3-breadcrumbs__link--disabled':
                                        breadcrumb.current,
                                }"
                                :disabled="!!breadcrumb.current"
                                :target="breadcrumb.target"
                                :to="breadcrumb.link"
                            >
                                {{ breadcrumb.title }}
                            </T3Link>
                            <span
                                v-if="!breadcrumb.current"
                                aria-hidden
                                class="t3-breadcrumbs__divider"
                            ></span>
                        </li>
                    </template>
                </ol>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type T3Model, useT3Config, useT3Theme, useT3Util } from '#imports'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
    ariaLabel?: string
    pageData: T3Model.Typo3.Page.Data
}>()

const config = useT3Config()
const { backgroundColors } = useT3Theme()
const { detectScrollEnd } = useT3Util()

const viewport = ref<HTMLElement>()
const content = ref<HTMLUListElement>()
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

    &__container {
        position: relative;
        box-sizing: border-box;
    }

    &__viewport {
        overflow-x: auto;
        position: relative;
    }

    &__content {
        width: fit-content;
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    &__overlay {
        content: '';
        top: 0;
        position: absolute;
        width: 0;
        height: 100%;
        z-index: 1;
        pointer-events: none;

        &--left {
            left: 0;
            background: linear-gradient(
                to left,
                rgb(255 255 255 / 0%) 0%,
                v-bind(backgroundColor) 100%
            );
        }

        &--right {
            right: 0;
            background: linear-gradient(
                to right,
                rgb(255 255 255 / 0%) 0%,
                v-bind(backgroundColor) 100%
            );
        }
    }
}
</style>
