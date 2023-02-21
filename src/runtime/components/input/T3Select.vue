<template>
    <div
        class="t3-select"
        :class="{
            't3-select--required': required,
            't3-select--disabled': disabled,
        }"
    >
        <span :id="name" class="t3-select__label">{{ label }}</span>
        <div class="t3-select__wrapper">
            <select
                :id="name"
                ref="nativeSelect"
                v-model="value"
                class="t3-select__native"
                :aria-labelledby="name"
                :name="name"
                :disabled="disabled"
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
                            @click="setValue(option.value)"
                            @mouseover="hoverOption = option"
                            @mouseleave="hoverOption = undefined"
                        >
                            {{ option.label }}
                        </div>
                    </div>
                </T3CollapseTransition>
            </div>
        </div>
        <T3CollapseTransition transition-name="error-transition">
            <div v-if="errorMessage" class="t3-select__error">
                {{ errorMessage }}
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useT3SelectInput } from '#nuxt-typo3/composables/useT3SelectInput'

const props = defineProps<{
    name: string
    label?: string
    options: { [key: string]: string }
    defaultValue?: string
    validation?: RuleExpression<any>
    emptyLabel?: string
    required?: boolean
    disabled?: boolean
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

// Add empty option to options, use nbsp (160) for label if none is defined
const options = computed(() =>
    [{ value: '', label: props.emptyLabel ?? String.fromCharCode(160) }].concat(
        Object.entries(props.options).map(([value, label]) => ({
            value,
            label,
        }))
    )
)

function select(hoverOption: { value: string; label: string }) {
    setValue(hoverOption.value)
    close()
}

const { hoverOption, supportKeyboardNavigation } = useT3SelectInput(
    select,
    options
)

const selectedOption = computed(() =>
    options.value.find((option) => option.value === value.value)
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
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/colors' as colors;
@use '#nuxt-typo3/assets/styles/transition-durations' as transition-durations;

.t3-select {
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

        .options-transition {
            &-enter-active,
            &-leave-active {
                transition: height transition-durations.$select;
            }
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
        color: colors.$error;
    }

    .error-transition {
        &-enter-active,
        &-leave-active {
            transition: height transition-durations.$input-error;
        }
    }

    &--required & {
        &__label {
            &::after {
                content: '*';
            }
        }
    }
}
</style>
