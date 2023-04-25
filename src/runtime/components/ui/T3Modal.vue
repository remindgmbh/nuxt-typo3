<template>
    <component
        :is="tag"
        class="t3-modal"
        :class="{
            't3-modal--visible': visible || transitioning,
            't3-modal--transitioning': transitioning,
        }"
    >
        <transition
            :name="backgroundTransitionName"
            @before-enter="setBackgroundTransitioning(true)"
            @after-enter="setBackgroundTransitioning(false)"
            @enter-cancelled="setBackgroundTransitioning(false)"
            @before-leave="setBackgroundTransitioning(true)"
            @after-leave="setBackgroundTransitioning(false)"
            @leave-cancelled="setBackgroundTransitioning(false)"
        >
            <div
                v-if="visible"
                class="t3-modal__background"
                data-testid="background"
                @click="onBackgroundClick"
            ></div>
        </transition>
        <transition
            :name="contentTransitionName"
            @before-enter="setContentTransitioning(true)"
            @after-enter="setContentTransitioning(false)"
            @enter-cancelled="setContentTransitioning(false)"
            @before-leave="setContentTransitioning(true)"
            @after-leave="setContentTransitioning(false)"
            @leave-cancelled="setContentTransitioning(false)"
        >
            <slot v-if="visible" />
        </transition>
    </component>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { scrollbarDisabledSymbol } from './T3TopbarLayout/shared'

const props = withDefaults(
    defineProps<{
        backgroundTransitionName?: string
        contentTransitionName?: string
        closeOnOutsideClick?: boolean
        modelValue: boolean
        tag?: keyof HTMLElementTagNameMap
    }>(),
    {
        backgroundTransitionName: 'modal-background-transition',
        contentTransitionName: 'modal-content-transition',
        closeOnOutsideClick: false,
        tag: 'div',
    }
)

const scrollbarDisabled = inject(scrollbarDisabledSymbol, undefined)

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const visible = computed({
    get() {
        return props.modelValue
    },
    set(value: boolean) {
        emit('update:modelValue', value)
    },
})

watch(visible, (value) => {
    if (scrollbarDisabled) scrollbarDisabled.value = value
})

const backgroundTransitioning = ref(false)
const contentTransitioning = ref(false)

const transitioning = computed(
    () => backgroundTransitioning.value || contentTransitioning.value
)

function setBackgroundTransitioning(value: boolean) {
    backgroundTransitioning.value = value
}

function setContentTransitioning(value: boolean) {
    contentTransitioning.value = value
}

function onBackgroundClick() {
    if (props.closeOnOutsideClick) {
        visible.value = false
    }
}
</script>

<style lang="scss">
.t3-modal {
    top: 0;
    left: 0;
    position: fixed;
    width: 0;
    height: 0;
    overflow: hidden;
    display: flex;
    z-index: 30;

    &--visible {
        height: 100%;
        width: 100%;
    }

    &--transitioning {
        overflow: hidden;
    }

    &__background {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: -1;

        // Set background color
    }
}
</style>
