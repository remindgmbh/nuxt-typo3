<template>
    <div class="t3-select">
        <span :id="name" class="t3-select__label">{{ label }}</span>
        <div class="t3-select__wrapper">
            <select
                :id="name"
                ref="nativeSelect"
                v-model="value"
                class="t3-select__native"
                :aria-labelledby="name"
                :name="name"
            >
                <option
                    v-for="(optionLabel, optionValue) in options"
                    :key="optionValue"
                    :value="optionValue"
                >
                    {{ optionLabel }}
                </option>
            </select>

            <div
                ref="customSelect"
                class="t3-select__custom"
                :class="{ 't3-select__custom--active': isOpen }"
                aria-hidden="true"
                @click="toggle"
            >
                <div class="t3-select__trigger">
                    {{ options[value] ?? emptyLabel }}
                </div>
                <T3CollapseTransition>
                    <div v-show="isOpen" class="t3-select__options">
                        <div
                            v-for="(optionLabel, optionValue) in options"
                            :key="optionValue"
                            class="t3-select__option"
                            :class="{
                                't3-select__option--selected':
                                    value === optionValue,
                                't3-select__option--hover':
                                    optionValue === hoverOption,
                            }"
                            @click="setValue(optionValue.toString())"
                            @mouseover="hoverOption = optionValue.toString()"
                            @mouseleave="hoverOption = undefined"
                        >
                            {{ optionLabel }}
                        </div>
                    </div>
                </T3CollapseTransition>
            </div>
        </div>
        <T3CollapseTransition>
            <div v-if="errorMessage" class="t3-select__error">
                {{ errorMessage }}
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import * as yup from 'yup'

const props = defineProps<{
    name: string
    label?: string
    options: { [key: string]: string }
    defaultValue?: string
    validation?: yup.Schema
    emptyLabel?: string
}>()

onMounted(() => {
    nativeSelect.value?.addEventListener('keydown', openCustomSelect)
})

onUnmounted(() => {
    document.removeEventListener('keydown', supportKeyboardNavigation)
    document.removeEventListener('click', closeOnOutsideClick)
    nativeSelect.value?.removeEventListener('keydown', openCustomSelect)
})

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { errorMessage, value, setValue } = useField<string>(
    name,
    props.validation,
    {
        initialValue: props.defaultValue,
    }
)

const customSelect = ref<HTMLDivElement>()
const nativeSelect = ref<HTMLSelectElement>()
const isOpen = ref(false)
const hoverOption = ref<string>()

const optionKeys = computed(() => Object.keys(props.options))
const hoverOptionIndex = computed(() =>
    optionKeys.value.indexOf(hoverOption.value ?? '')
)
const canHover = computed(() => window.matchMedia('(hover: hover)').matches)

function toggle() {
    isOpen.value ? close() : open()
}

function open() {
    isOpen.value = true
    nativeSelect.value?.removeEventListener('keydown', openCustomSelect)
    document.addEventListener('keydown', supportKeyboardNavigation)
    document.addEventListener('click', closeOnOutsideClick)
}

function close() {
    isOpen.value = false
    document.removeEventListener('keydown', supportKeyboardNavigation)
    document.removeEventListener('click', closeOnOutsideClick)
    nativeSelect.value?.addEventListener('keydown', openCustomSelect)
}

function openCustomSelect(e: KeyboardEvent) {
    if (canHover.value && e.key === ' ') {
        e.preventDefault()
        e.stopImmediatePropagation()
        open()
    }
}

function closeOnOutsideClick(e: MouseEvent) {
    if (
        customSelect.value &&
        e.target instanceof Node &&
        !customSelect.value.contains(e.target)
    ) {
        close()
    }
}

function supportKeyboardNavigation(e: KeyboardEvent) {
    // press down -> go next
    if (
        e.key === 'ArrowDown' &&
        hoverOptionIndex.value < optionKeys.value.length - 1
    ) {
        e.preventDefault() // prevent page scrolling
        hoverOption.value = optionKeys.value.at(hoverOptionIndex.value + 1)
    }

    // press up -> go previous
    if (e.key === 'ArrowUp' && hoverOptionIndex.value > 0) {
        e.preventDefault() // prevent page scrolling
        hoverOption.value = optionKeys.value.at(hoverOptionIndex.value - 1)
    }

    // press Enter or space -> select the option
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()

        if (hoverOption.value) {
            setValue(hoverOption.value)
            close()
        }
    }

    // press ESC -> close selectCustom
    if (e.key === 'Escape') {
        close()
    }
}
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

.t3-select {
    .collapse-enter-active,
    .collapse-leave-active {
        transition: height $transition-duration-input-error;
    }

    $color-background: #fff;
    $color-border: #8f8f9d;
    $color-border-active: #676774;
    $color-hover: #e0e0e6;
    $border-radius: 0.125rem;
    $border-width: 0.0625rem;
    $trigger-padding: 0.0625rem;

    position: relative;

    &__wrapper {
        position: relative;
    }

    &__native {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &__custom {
        position: relative;
        pointer-events: none;

        @media (hover: hover) {
            pointer-events: auto;
        }

        .collapse-enter-active,
        .collapse-leave-active {
            transition: height $transition-duration-select;
        }
    }

    &__trigger {
        position: relative;
        background-color: $color-background;
        border: $color-border $border-width solid;
        border-radius: $border-radius;
        padding: $trigger-padding;
        box-sizing: border-box;
        cursor: pointer;

        &::after {
            content: '▾';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        &:hover {
            border-color: $color-border-active;
        }
    }

    &__options {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        border: $border-width solid $color-border-active;
        border-radius: $border-radius;
        background-color: $color-background;
        z-index: 1;
        box-sizing: border-box;
    }

    &__option {
        cursor: pointer;

        &--hover {
            background-color: $color-hover;
        }
    }

    &__error {
        color: $color-error;
    }
}
</style>
