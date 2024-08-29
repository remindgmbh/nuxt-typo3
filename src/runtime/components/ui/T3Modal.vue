<template>
    <Teleport to="body">
        <!-- css v-bind not working without extra wrapper around transition, see: https://github.com/vuejs/core/issues/7312 -->
        <div v-bind="$attrs">
            <Transition :name="transitionName">
                <div
                    v-if="modelValue"
                    ref="modalRef"
                    class="t3-modal"
                    @click="onOutsideClick"
                >
                    <slot></slot>
                </div>
            </Transition>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { type FocusTrap, createFocusTrap } from 'focus-trap'
import { computed, ref, watch } from 'vue'
import { nextTick, useT3LayoutInjection } from '#imports'

export interface Props {
    backgroundColor?: string
    closeOnOutsideClick?: boolean
    modelValue: boolean
    transitionName?: string
}

export interface Emits {
    (e: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
    backgroundColor: undefined,
    closeOnOutsideClick: false,
    transitionName: 'modal-transition',
})

const emit = defineEmits<Emits>()

defineOptions({
    inheritAttrs: false,
})

const { injectOptionalScrollbarDisabled } = useT3LayoutInjection()

const scrollbarDisabled = injectOptionalScrollbarDisabled()

const modalRef = ref<HTMLDivElement>()

const focusTrap = ref<FocusTrap>()

const visible = computed({
    get() {
        return props.modelValue
    },
    set(value: boolean) {
        emit('update:modelValue', value)
    },
})

function onOutsideClick(e: MouseEvent) {
    if (props.closeOnOutsideClick && e.target === modalRef.value) {
        visible.value = false
    }
}

watch(visible, (value) => {
    if (scrollbarDisabled) {
        scrollbarDisabled.value = value
    }
    if (value) {
        nextTick(() => {
            if (modalRef.value) {
                focusTrap.value = createFocusTrap(modalRef.value, {
                    initialFocus: false,
                })
                focusTrap.value.activate()
            }
        })
    } else {
        focusTrap.value?.deactivate()
    }
})
</script>

<style lang="scss">
.t3-modal {
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: v-bind(backgroundColor);
    overflow: auto;
}
</style>
