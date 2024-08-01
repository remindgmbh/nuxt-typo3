<template>
    <div class="t3-select" :class="{ 't3-select--open': isOpen }">
        <select
            :id="name"
            ref="selectEl"
            v-model="value"
            :aria-controls="listboxId"
            :aria-errormessage="ariaErrormessage"
            :aria-expanded="isOpen"
            aria-haspopup="listbox"
            :aria-invalid="ariaInvalid"
            class="t3-select__trigger"
            :disabled="disabled"
            :name="name"
            :required="required"
            role="combobox"
            @blur="onBlur"
            @keydown="onKeydown"
            @mousedown="onMousedown"
        >
            <option
                v-for="option in options"
                :key="option.value"
                aria-hidden="true"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
        <T3CollapseTransition transition-name="options-transition">
            <div
                v-show="isOpen"
                ref="optionsWrapperEl"
                class="t3-select__options-wrapper"
                tabindex="-1"
            >
                <ul :id="listboxId" class="t3-select__options" role="listbox">
                    <li
                        v-for="option in options"
                        :key="option.value"
                        :aria-selected="option.value === value"
                        class="t3-select__option"
                        :class="{
                            't3-select__option--selected':
                                option.value === value,
                        }"
                        role="option"
                        @click="select(option.value)"
                    >
                        <slot name="option" :option="option">
                            {{ option.label }}
                        </slot>
                    </li>
                </ul>
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'
import { computed, ref } from 'vue'
import { type T3Model } from '#imports'

const props = defineProps<{
    ariaInvalid?: boolean
    ariaErrormessage?: string
    name: string
    options: T3Model.Input.Select.Option[]
    defaultValue?: string
    validation?: RuleExpression<any>
    disabled?: boolean
    required?: boolean
}>()

const selectEl = ref<HTMLSelectElement>()
const optionsWrapperEl = ref<HTMLDivElement>()

const isOpen = ref(false)
const canHover = computed(() => window?.matchMedia('(hover: hover)').matches)
const listboxId = computed(() => `${props.name}-listbox`)

const { value, handleBlur, setValue } = useField<string>(
    () => props.name,
    props.validation,
    {
        initialValue:
            props.options.find((value) => value.value === props.defaultValue)
                ?.value ??
            props.options.at(0)?.value ??
            '',
    },
)

function onKeydown(e: KeyboardEvent) {
    switch (e.code) {
        case 'Space':
            handleEvent(e, () => {
                if (!isOpen.value) {
                    open()
                }
            })
            break
        case 'Escape':
        case 'Enter':
            handleEvent(e, () => {
                if (isOpen.value) {
                    close()
                }
            })
            break
        default:
            break
    }
}

function onMousedown(e: MouseEvent) {
    handleEvent(e, isOpen.value ? close : open)
}

function handleEvent(e: Event, callback: () => void) {
    if (canHover.value) {
        e.preventDefault()
        callback()
    }
}

function select(value: string) {
    setValue(value)
    close()
}

function onBlur(e: FocusEvent) {
    handleBlur(e)
    if (e.relatedTarget !== optionsWrapperEl.value) {
        close()
    }
}

function open() {
    isOpen.value = true
    selectEl.value?.focus()
}

function close() {
    isOpen.value = false
}
</script>

<style lang="scss">
.t3-select {
    position: relative;

    &__trigger {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        appearance: none;
        border: none;
        background-color: transparent;
        padding: 0;
        font-family: inherit;
        font-size: inherit;
        font-style: inherit;
        font-weight: inherit;
    }

    &__options-wrapper {
        position: absolute;
        top: 100%;
        width: 100%;
        left: 0;
        z-index: 1;
        box-sizing: border-box;
    }

    &__options {
        margin: 0;
        padding: 0;
    }

    &__option {
        cursor: pointer;
        list-style-type: none;
    }
}
</style>
