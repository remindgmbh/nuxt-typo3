<template>
    <div
        class="t3-select"
        :class="{
            't3-select--required': required,
            't3-select--disabled': disabled,
            't3-select--error': meta.touched && !meta.valid,
            't3-select--success': meta.touched && meta.valid,
        }"
    >
        <T3InputLabel class="t3-select__label" :label="label" tag="span" />
        <div class="t3-select__wrapper">
            <select
                :id="name"
                ref="nativeSelect"
                v-model="value"
                class="t3-select__native"
                :aria-labelledby="name"
                :name="name"
                :disabled="disabled"
                @blur="handleBlur"
            >
                <option
                    v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                >
                    {{ option.label }}
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
                    {{ selectedOption?.label }}
                </div>
                <T3CollapseTransition transition-name="options-transition">
                    <div v-show="isOpen" class="t3-select__options">
                        <div
                            v-for="option in options"
                            :key="option.value"
                            class="t3-select__option"
                            :class="{
                                't3-select__option--selected':
                                    option.value === value,
                                't3-select__option--hover':
                                    option.value === hoverOption?.value,
                            }"
                            @click="handleBlurAndSetValue(option.value)"
                            @mouseover="hoverOption = option"
                            @mouseleave="hoverOption = undefined"
                        >
                            {{ option.label }}
                        </div>
                    </div>
                </T3CollapseTransition>
            </div>
        </div>
        <slot name="error" :error-message="errorMessage"></slot>
    </div>
</template>

<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { T3Model, useT3SelectInput } from '#imports'

const props = defineProps<{
    name: string
    label?: string
    options: T3Model.Input.Select.Option[]
    defaultValue?: string
    validation?: RuleExpression<any>
    disabled?: boolean
    required?: boolean
}>()

const emit = defineEmits<{
    (e: 'change', option?: T3Model.Input.Select.Option): void
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
const { errorMessage, meta, value, handleBlur, setValue } = useField<string>(
    name,
    props.validation,
    {
        initialValue:
            props.options.find((value) => value.value === props.defaultValue)
                ?.value ??
            props.options.at(0)?.value ??
            '',
    }
)

const customSelect = ref<HTMLDivElement>()
const nativeSelect = ref<HTMLSelectElement>()
const isOpen = ref(false)

function handleBlurAndSetValue(value: string) {
    handleBlur()
    setValue(value)
}

function select(hoverOption: T3Model.Input.Select.Option) {
    handleBlurAndSetValue(hoverOption.value)
    close()
}

const { hoverOption, supportKeyboardNavigation } = useT3SelectInput(
    select,
    props.options
)

const selectedOption = computed(() =>
    props.options.find((option) => option.value === value.value)
)

const canHover = computed(() => window.matchMedia('(hover: hover)').matches)

function toggle() {
    isOpen.value ? close() : open()
}

function open() {
    if (props.disabled) {
        return
    }
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

watch(value, () => emit('change', selectedOption.value))
</script>

<style lang="scss">
.t3-select {
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

        // set transition for opening options
        // .options-transition {
        //     &-enter-active,
        //     &-leave-active {
        //         transition: height ...;
        //     }
        // }
    }

    &__trigger {
        position: relative;
        box-sizing: border-box;
        cursor: pointer;
    }

    &__options {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 1;
        box-sizing: border-box;
    }

    &__option {
        cursor: pointer;
    }
}
</style>
