<template>
    <div class="image-gallery-scroll">
        <div class="container">
            <div class="image-gallery-scroll__close-wrapper">
                <button
                    class="image-gallery-scroll__close"
                    @click="emit('close')"
                >
                    <span class="image-gallery-scroll__close-label">{{
                        t('imageGallery.close')
                    }}</span>
                </button>
            </div>
            <h2 v-if="header" class="image-gallery-scroll__header">
                <div v-if="subheader" class="image-gallery-scroll__header-sub">
                    {{ subheader }}
                </div>
                <div class="image-gallery-scroll__header-main">
                    {{ header }}
                </div>
            </h2>
            <div class="image-gallery-scroll__items">
                <template v-for="(image, index) in images" :key="index">
                    <div
                        :ref="(el) => setItem(el, index)"
                        class="image-gallery-scroll__item"
                    >
                        <div class="image-gallery-scroll__image">
                            <slot name="scrollImage" :image="image">
                                <T3Asset :file="image" />
                            </slot>
                        </div>
                        <div class="image-gallery-scroll__text">
                            <div class="image-gallery-scroll__number">
                                {{ padNumber(index + 1, images.length) }} /
                                {{ images.length }}
                            </div>
                            <div class="image-gallery-scroll__title">
                                {{ image.properties.title }}
                            </div>
                            <div class="image-gallery-scroll__description">
                                {{ image.properties.description }}
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="index < images.length - 1"
                        class="image-gallery-scroll__divider"
                    ></div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ComponentPublicInstance, onMounted, ref } from 'vue'
import { T3Model, useT3Util } from '#imports'

const props = defineProps<{
    header?: string
    subheader?: string
    images: T3Model.Typo3.Asset[]
    scrollToIndex: number
}>()

const { t } = useI18n()

const { padNumber } = useT3Util()

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
.image-gallery-scroll {
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
