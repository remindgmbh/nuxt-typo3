<template>
    <div class="t3-image-gallery-slide-navigation">
        <Swiper
            class="t3-image-gallery-slide-navigation__swiper"
            free-mode
            :modules="[FreeMode, Scrollbar]"
            :scrollbar="{
                draggable: true,
                el: '.t3-image-gallery-slide-navigation__scrollbar',
                horizontalClass:
                    't3-image-gallery-slide-navigation__scrollbar--horizontal',
                verticalClass:
                    't3-image-gallery-slide-navigation__scrollbar--vertical',
                lockClass: 't3-image-gallery-slide-navigation__scrollbar--lock',
                scrollbarDisabledClass:
                    't3-image-gallery-slide-navigation__scrollbar--disabled',
                dragClass: 't3-image-gallery-slide-navigation__scrollbar-drag',
            }"
            slides-per-view="auto"
            :watch-slides-progress="true"
            @swiper="setSwiper"
        >
            <SwiperSlide
                v-for="(image, index) in images"
                :key="index"
                class="t3-image-gallery-slide-navigation__slide"
            >
                <T3Img
                    v-bind="image"
                    class="t3-image-gallery-slide-navigation__image"
                    :class="{
                        't3-image-gallery-slide-navigation__image--active':
                            index === activeIndex,
                    }"
                />
            </SwiperSlide>
            <div class="t3-image-gallery-slide-navigation__scrollbar"></div>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
import { FreeMode, Scrollbar, Swiper as SwiperClass } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Model } from '#nuxt-typo3'

defineProps<{
    activeIndex: number
    images: Model.Image[]
}>()

const emit = defineEmits<{
    (e: 'setSwiper', swiper: SwiperClass): void
}>()

function setSwiper(swiper: SwiperClass) {
    emit('setSwiper', swiper)
}
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

.t3-image-gallery-slide-navigation {
    height: 100%;
    box-sizing: border-box;

    &__swiper {
        height: 100%;
    }

    &__slide {
        &.swiper-slide {
            width: initial;
        }
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    &__scrollbar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: $image-gallery-scrollbar-height;
        background-color: $image-gallery-scrollbar-color-background;
        z-index: 1;
    }

    &__scrollbar-drag {
        height: 100%;
        background-color: $image-gallery-scrollbar-color;
    }
}
</style>
