<template>
    <div class="image-gallery-slide-navigation">
        <Swiper
            class="image-gallery-slide-navigation__swiper"
            free-mode
            :modules="[FreeMode, Scrollbar]"
            :scrollbar="{
                draggable: true,
                el: '.image-gallery-slide-navigation__scrollbar',
                horizontalClass:
                    'image-gallery-slide-navigation__scrollbar--horizontal',
                verticalClass:
                    'image-gallery-slide-navigation__scrollbar--vertical',
                lockClass: 'image-gallery-slide-navigation__scrollbar--lock',
                scrollbarDisabledClass:
                    'image-gallery-slide-navigation__scrollbar--disabled',
                dragClass: 'image-gallery-slide-navigation__scrollbar-drag',
            }"
            slides-per-view="auto"
            :watch-slides-progress="true"
            @swiper="setSwiper"
        >
            <SwiperSlide
                v-for="(image, index) in images"
                :key="index"
                class="image-gallery-slide-navigation__slide"
            >
                <div
                    class="image-gallery-slide-navigation__image"
                    :class="{
                        'image-gallery-slide-navigation__image--active':
                            index === activeIndex,
                    }"
                >
                    <slot name="image" :image="image">
                        <T3Asset :file="image" />
                    </slot>
                </div>
            </SwiperSlide>
            <div class="image-gallery-slide-navigation__scrollbar"></div>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
import { FreeMode, Scrollbar, Swiper as SwiperClass } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { T3Model } from '#imports'

defineProps<{
    activeIndex: number
    images: T3Model.Typo3.Asset[]
}>()

const emit = defineEmits<{
    (e: 'setSwiper', swiper: SwiperClass): void
}>()

function setSwiper(swiper: SwiperClass) {
    emit('setSwiper', swiper)
}
</script>

<style lang="scss">
.image-gallery-slide-navigation {
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
        z-index: 1;

        // set scrollbar height:
        // height: ...
    }

    &__scrollbar-drag {
        height: 100%;
    }
}
</style>
