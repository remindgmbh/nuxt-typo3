<template>
    <div class="t3-image-gallery-scroll">
        <div class="container">
            <div class="t3-image-gallery-scroll__close-wrapper">
                <button
                    class="t3-image-gallery-scroll__close"
                    @click="emit('close')"
                >
                    <span class="t3-image-gallery-scroll__close-label">{{
                        t('imageGallery.close')
                    }}</span>
                </button>
            </div>
            <h2 v-if="header" class="t3-image-gallery-scroll__header">
                <div
                    v-if="subheader"
                    class="t3-image-gallery-scroll__header-sub"
                >
                    {{ subheader }}
                </div>
                <div class="t3-image-gallery-scroll__header-main">
                    {{ header }}
                </div>
            </h2>
            <div class="t3-image-gallery-scroll__items">
                <template v-for="(image, index) in images" :key="index">
                    <div
                        :ref="(el) => setItem(el, index)"
                        class="t3-image-gallery-scroll__item"
                    >
                        <div class="t3-image-gallery-scroll__image">
                            <NuxtImg v-bind="image" />
                        </div>
                        <div class="t3-image-gallery-scroll__text">
                            <div class="t3-image-gallery-scroll__number">
                                {{ padNumber(index + 1, images.length) }} /
                                {{ images.length }}
                            </div>
                            <div class="t3-image-gallery-scroll__title">
                                {{ image.title }}
                            </div>
                            <div class="t3-image-gallery-scroll__description">
                                {{ image.description }}
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="index < images.length - 1"
                        class="t3-image-gallery-scroll__divider"
                    ></div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ComponentPublicInstance, onMounted, ref } from 'vue'
import { Model, useUtil } from '#nuxt-typo3'

const props = defineProps<{
    header?: string
    subheader?: string
    images: Model.Image[]
    scrollToIndex: number
}>()

const { t } = useI18n()

const { padNumber } = useUtil()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const items = ref<Element[]>([])

onMounted(() => {
    if (props.scrollToIndex > 0) {
        const item = items.value.at(props.scrollToIndex)
        item?.scrollIntoView()
    }
})

function setItem(el: Element | ComponentPublicInstance | null, index: number) {
    if (el instanceof Element) {
        items.value[index] = el
    }
}
</script>

<style lang="scss">
.t3-image-gallery-scroll {
    width: 100%;
    height: 100%;
    overflow: auto;

    &__header {
        margin: initial;
    }

    &__item {
        display: flex;
    }

    &__image {
        width: 75%;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
        }
    }

    &__text {
        width: 25%;
    }
}
</style>
