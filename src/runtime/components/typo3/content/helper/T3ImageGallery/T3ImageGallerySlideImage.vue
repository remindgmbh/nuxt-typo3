<template>
    <div class="image-gallery-slide-image">
        <Swiper
            class="image-gallery-slide-image__swiper"
            :initial-slide="activeIndex"
            :modules="[Navigation, Thumbs]"
            :navigation="{
                nextEl: '.image-gallery-slide-image__navigation.image-gallery-slide-image__navigation--next',
                prevEl: '.image-gallery-slide-image__navigation.image-gallery-slide-image__navigation--prev',
                disabledClass:
                    'image-gallery-slide-image__navigation--disabled',
                lockClass: 'image-gallery-slide-image__navigation--lock',
                hiddenClass: 'image-gallery-slide-image__navigation--hidden',
            }"
            :slides-per-view="1"
            :thumbs="{ swiper: thumbsSwiper }"
            @active-index-change="updateActiveIndex"
            @swiper="setSwiper"
        >
            <SwiperSlide
                v-for="(image, index) in images"
                v-slot="{ isActive }"
                :key="index"
                class="image-gallery-slide-image__slide"
            >
                <div
                    class="image-gallery-slide-image__image"
                    :class="{
                        'image-gallery-slide-image__image--active': isActive,
                    }"
                >
                    <slot name="image" :image="image">
                        <T3Asset :file="image" />
                    </slot>
                </div>
            </SwiperSlide>
            <div
                class="image-gallery-slide-image__navigation image-gallery-slide-image__navigation--prev"
            ></div>
            <div
                class="image-gallery-slide-image__navigation image-gallery-slide-image__navigation--next"
            ></div>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper as SwiperClass } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { T3Model } from '#imports'

defineProps<{
    images: T3Model.Typo3.Asset[]
    activeIndex: number
    thumbsSwiper?: SwiperClass
}>()

const emit = defineEmits<{
    (e: 'update:activeIndex', value: number): void
    (e: 'setSwiper', swiper: SwiperClass): void
}>()

function updateActiveIndex(swiper: SwiperClass) {
    emit('update:activeIndex', swiper.activeIndex)
}

function setSwiper(swiper: SwiperClass) {
    emit('setSwiper', swiper)
}
</script>

<style lang="scss">
.image-gallery-slide-image {
    height: 100%;

    &__swiper {
        height: 100%;
    }

    &__slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: contain;
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
}
</style>
