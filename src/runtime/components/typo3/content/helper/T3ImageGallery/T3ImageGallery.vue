<template>
    <div class="t3-image-gallery">
        <Swiper
            class="t3-image-gallery__swiper"
            free-mode
            slides-per-view="auto"
            :modules="[FreeMode, Navigation, Scrollbar]"
            :navigation="{
                nextEl: '.t3-image-gallery__navigation.t3-image-gallery__navigation--next',
                prevEl: '.t3-image-gallery__navigation.t3-image-gallery__navigation--prev',
                disabledClass: 't3-image-gallery__navigation--disabled',
                lockClass: 't3-image-gallery__navigation--lock',
                hiddenClass: 't3-image-gallery__navigation--hidden',
            }"
            :scrollbar="{
                draggable: true,
                el: '.t3-image-gallery__scrollbar',
                horizontalClass: 't3-image-gallery__scrollbar--horizontal',
                verticalClass: 't3-image-gallery__scrollbar--vertical',
                lockClass: 't3-image-gallery__scrollbar--lock',
                scrollbarDisabledClass: 't3-image-gallery__scrollbar--disabled',
                dragClass: 't3-image-gallery__scrollbar-drag',
            }"
        >
            <SwiperSlide
                v-for="(image, index) in images"
                :key="index"
                class="t3-image-gallery__slide"
            >
                <slot name="previewImage" :image="image">
                    <T3Asset :file="image" @click="showModal(index)" />
                </slot>
            </SwiperSlide>
            <div class="t3-image-gallery__scrollbar"></div>
            <div
                class="t3-image-gallery__navigation t3-image-gallery__navigation--prev"
            ></div>
            <div
                class="t3-image-gallery__navigation t3-image-gallery__navigation--next"
            ></div>
        </Swiper>
        <T3Modal
            v-model="modalVisible"
            close-on-outside-click
            class="t3-image-gallery__modal"
        >
            <component
                :is="
                    type === 'scroll'
                        ? T3ImageGalleryScroll
                        : T3ImageGallerySlide
                "
                :header="header"
                :images="images"
                :subheader="subheader"
                :scroll-to-index="scrollToIndex"
                @close="hideModal"
            >
                <template #slideImage="{ image }">
                    <slot name="slideImage" :image="image"></slot>
                </template>
                <template #slideImageNavigation="{ image }">
                    <slot name="slideImageNavigation" :image="image"></slot>
                </template>
                <template #scrollImage="{ image }">
                    <slot name="scrollImage" :image="image"></slot>
                </template>
            </component>
        </T3Modal>
    </div>
</template>

<script setup lang="ts">
import 'swiper/scss'
import { FreeMode, Navigation, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import { T3Model } from '#imports'
import { T3ImageGalleryScroll, T3ImageGallerySlide } from '#components'

withDefaults(
    defineProps<{
        header?: string
        subheader?: string
        images: T3Model.Typo3.Asset[]
        type?: 'scroll' | 'slide'
    }>(),
    {
        header: undefined,
        subheader: undefined,
        type: 'scroll',
    }
)

const modalVisible = ref(false)
const scrollToIndex = ref(-1)

function showModal(index: number) {
    modalVisible.value = true
    scrollToIndex.value = index
}

function hideModal() {
    modalVisible.value = false
    scrollToIndex.value = -1
}
</script>

<style lang="scss">
.t3-image-gallery {
    // Set gallery height:
    // height: ...

    &__swiper {
        height: 100%;
    }

    &__navigation {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        cursor: pointer;

        &--next {
            right: 0;

            &::after {
                content: '>';
            }
        }

        &--prev {
            left: 0;

            &::after {
                content: '<';
            }
        }

        &--disabled {
            cursor: default;
        }
    }

    &__slide {
        cursor: pointer;
        width: initial;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    &__scrollbar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 1;

        // set scrollbar height:
        // height: ...
    }

    &__scrollbar-drag {
        height: 100%;
    }
}
</style>
