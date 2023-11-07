<template>
    <div ref="rootDiv" class="image-gallery-slide">
        <div ref="headerDiv" class="image-gallery-slide__header">
            <component
                :is="ImageGallerySlideHeader"
                :active-index="activeIndex"
                :header="header"
                :images="images"
                :subheader="subheader"
                @close="emit('close')"
            />
        </div>
        <div
            class="image-gallery-slide__image"
            :style="{ height: imageHeight }"
        >
            <component
                :is="ImageGallerySlideImage"
                v-model:active-index="activeIndex"
                :images="images"
                :thumbs-swiper="thumbsSwiper"
                @set-swiper="setImageSwiper"
            >
                <template #image="{ image }">
                    <slot name="slideImage" :image="image"></slot>
                </template>
            </component>
        </div>
        <div ref="navigationDiv" class="image-gallery-slide__navigation">
            <component
                :is="ImageGallerySlideNavigation"
                :active-index="activeIndex"
                :images="images"
                @set-swiper="setThumbsSwiper"
            >
                <template #image="{ image }">
                    <slot name="slideImageNavigation" :image="image"></slot>
                </template>
            </component>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Swiper } from 'swiper'
import { debounce } from 'perfect-debounce'
import { ref, onMounted } from 'vue'
import { T3Model, useT3DynamicComponent } from '#imports'
import {
    T3ImageGallerySlideHeader,
    T3ImageGallerySlideImage,
    T3ImageGallerySlideNavigation,
} from '#components'

const props = defineProps<{
    header?: string
    subheader?: string
    images: T3Model.Typo3.Asset[]
    scrollToIndex: number
}>()

const ImageGallerySlideHeader = useT3DynamicComponent<
    typeof T3ImageGallerySlideHeader
>('ImageGallerySlideHeader')
const ImageGallerySlideImage = useT3DynamicComponent<
    typeof T3ImageGallerySlideImage
>('ImageGallerySlideImage')
const ImageGallerySlideNavigation = useT3DynamicComponent<
    typeof T3ImageGallerySlideNavigation
>('ImageGallerySlideNavigation')

const headerDiv = ref<HTMLDivElement>()
const rootDiv = ref<HTMLDivElement>()
const navigationDiv = ref<HTMLDivElement>()
const activeIndex = ref(props.scrollToIndex)
const imageSwiper = ref<Swiper>()
const thumbsSwiper = ref<Swiper>()
const imageHeight = ref('0px')

const emit = defineEmits<{
    (e: 'close'): void
}>()

const setThumbsSwiper = (swiper: Swiper) => {
    thumbsSwiper.value = swiper
}

const setImageSwiper = (swiper: Swiper) => {
    imageSwiper.value = swiper
}

onMounted(() => {
    // needed because it is not possible to set image-gallery-slide__image to fill remaining space
    // alternative approach is to set header to fixed height and use calc(100% - headerHeight - navigationHeight) in css
    // but header, subheader and title might lead to overflow
    resize()
    const resizeObserver = new ResizeObserver(debounce(resize, 50))
    if (rootDiv.value) {
        resizeObserver.observe(rootDiv.value)
    }
})

function resize() {
    const headerHeight = headerDiv.value?.clientHeight ?? 0
    const rootHeight = rootDiv.value?.clientHeight ?? 0
    const navigationHeight = navigationDiv.value?.clientHeight ?? 0
    imageHeight.value = `${rootHeight - headerHeight - navigationHeight}px`
    imageSwiper.value?.update()
}
</script>

<style lang="scss">
.image-gallery-slide {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    // Set navigation height:
    // &__navigation {
    //     height: ...;
    // }
}
</style>
