<template>
    <div class="image-gallery-slide-header">
        <h2 v-if="header" class="image-gallery-slide-header__header">
            <div class="image-gallery-slide-header__main">{{ header }}</div>
            <div v-if="subheader" class="image-gallery-slide-header__sub">
                {{ subheader }}
            </div>
        </h2>
        <div class="image-gallery-slide-header__active-image">
            <div class="image-gallery-slide-header__number">
                {{ padNumber(activeIndex + 1, images.length) }} /
                {{ images.length }}
            </div>
            <div v-if="title" class="image-gallery-slide-header__title">
                {{ title }}
            </div>
        </div>
        <div class="image-gallery-slide-header__close-wrapper">
            <button
                class="image-gallery-slide-header__close"
                @click="emit('close')"
            >
                <span class="image-gallery-slide-header__close-label">{{
                    t('imageGallery.close')
                }}</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { T3Model, useT3Util } from '#imports'

const props = defineProps<{
    activeIndex: number
    header?: string
    subheader?: string
    images: T3Model.Typo3.Asset[]
}>()

const { t } = useI18n()
const { padNumber } = useT3Util()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const activeImage = computed(() => props.images.at(props.activeIndex))

const title = computed(() => activeImage.value?.properties.title)
</script>
