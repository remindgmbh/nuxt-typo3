<template>
    <div
        class="select"
        :class="{
            'select--required': required,
            'select--disabled': disabled,
            'select--error': meta.touched && !meta.valid,
            'select--success': meta.touched && meta.valid,
        }"
    >
        <component
            :is="InputLabel"
            class="select__label"
            :label="label"
            tag="span"
        />
        <div class="select__wrapper">
            <select
                :id="name"
                ref="nativeSelect"
                v-model="value"
                class="select__native"
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
                    <slot name="option" :option="option">
                        {{ option.label }}
                    </slot>
                </option>
            </select>

            <div
                ref="customSelect"
                class="select__custom"
                :class="{ 'select__custom--active': isOpen }"
                aria-hidden="true"
                @click="toggle"
            >
                <div class="select__trigger">
                    <slot name="trigger" :selected-option="selectedOption">
                        {{ selectedOption?.label }}
                    </slot>
                </div>
                <T3CollapseTransition transition-name="options-transition">
                    <div v-show="isOpen" class="select__options-wrapper">
                        <div class="select__options">
                            <div
                                v-for="option in options"
                                :key="option.value"
                                class="select__option"
                                :class="{
                                    'select__option--selected':
                                        option.value === value,
                                    'select__option--hover':
                                        option.value === hoverOption?.value,
                                }"
                                @click="handleBlurAndSetValue(option.value)"
                                @mouseover="hoverOption = option"
                                @mouseleave="hoverOption = undefined"
                            >
                                <slot name="option" :option="option">
                                    {{ option.label }}
                                </slot>
                            </div>
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
import { T3Model, useT3SelectInput, useT3DynamicComponent } from '#imports'
import { T3InputLabel } from '#components'

const props = defineProps<{
    name: string
    label?: string
    options: T3Model.Input.Select.Option[]
    defaultValue?: string
    validation?: RuleExpression<any>
    disabled?: boolean
    required?: boolean
}>()

const InputLabel = useT3DynamicComponent<typeof T3InputLabel>('InputLabel')

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
.select {
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

    &__options-wrapper {
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
