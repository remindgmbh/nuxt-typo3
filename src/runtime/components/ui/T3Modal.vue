<template>
    <component
        :is="tag"
        class="t3-modal"
        :class="{
            't3-modal--visible': visible || transitioning,
            't3-modal--transitioning': transitioning,
        }"
    >
        <Transition
            :name="backgroundTransitionName"
            @after-enter="setBackgroundTransitioning(false)"
            @after-leave="setBackgroundTransitioning(false)"
            @before-enter="setBackgroundTransitioning(true)"
            @before-leave="setBackgroundTransitioning(true)"
            @enter-cancelled="setBackgroundTransitioning(false)"
            @leave-cancelled="setBackgroundTransitioning(false)"
        >
            <div
                v-if="visible"
                class="t3-modal__background"
                data-testid="background"
                @click="onBackgroundClick"
            ></div>
        </Transition>
        <Transition
            :name="contentTransitionName"
            @after-enter="setContentTransitioning(false)"
            @after-leave="setContentTransitioning(false)"
            @before-enter="setContentTransitioning(true)"
            @before-leave="setContentTransitioning(true)"
            @enter-cancelled="setContentTransitioning(false)"
            @leave-cancelled="setContentTransitioning(false)"
        >
            <slot v-if="visible"></slot>
        </Transition>
    </component>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useT3LayoutInjection } from '#imports'

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
        closeOnOutsideClick: false,
        contentTransitionName: 'modal-content-transition',
        tag: 'div',
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const { injectOptionalScrollbarDisabled } = useT3LayoutInjection()

const scrollbarDisabled = injectOptionalScrollbarDisabled()

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
    () => backgroundTransitioning.value || contentTransitioning.value,
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
