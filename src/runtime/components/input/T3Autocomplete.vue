<template>
    <div
        class="t3-autocomplete"
        :class="{
            't3-autocomplete--required': required,
            't3-autocomplete--disabled': disabled,
        }"
    >
        <label v-if="label" :for="name" class="t3-autocomplete__label">{{
            label
        }}</label>
        <div ref="wrapper" class="t3-autocomplete__wrapper">
            <input
                :id="name"
                ref="input"
                v-model="value"
                type="text"
                class="t3-autocomplete__input"
                :name="name"
                :placeholder="placeholder"
                :disabled="disabled"
                autocomplete="off"
                @input="onInput"
            />
            <T3CollapseTransition transition-name="options-transition">
                <div v-show="isOpen" class="t3-autocomplete__option-groups">
                    <div
                        v-for="optionGroup in optionGroups"
                        :key="optionGroup.name"
                        class="t3-autocomplete__option-group"
                        :class="`t3-autocomplete__option-group--${optionGroup.name}`"
                    >
                        <div
                            v-if="optionGroup.label"
                            class="t3-autocomplete__option-group-label"
                        >
                            {{ optionGroup.label }}
                        </div>
                        <div class="t3-autocomplete__options">
                            <template
                                v-for="option in optionGroup.options"
                                :key="option.key"
                            >
                                <NuxtLink
                                    v-if="option.link"
                                    :to="option.link"
                                    class="t3-autocomplete__option"
                                    :class="{
                                        't3-autocomplete__option--hover':
                                            hoverOption === option,
                                    }"
                                    @mouseover="setHover(option)"
                                    @mouseleave="setHover(undefined)"
                                    >{{ option.label }}</NuxtLink
                                >
                                <div
                                    v-else
                                    class="t3-autocomplete__option"
                                    :class="{
                                        't3-autocomplete__option--selected':
                                            value === option.key,
                                        't3-autocomplete__option--hover':
                                            hoverOption === option,
                                    }"
                                    @click="onSelect(option)"
                                    @mouseover="setHover(option)"
                                    @mouseleave="setHover(undefined)"
                                >
                                    {{ option.label }}
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </T3CollapseTransition>
        </div>
        <T3CollapseTransition transition-name="error-transition">
            <div v-if="errorMessage" class="t3-autocomplete__error">
                {{ errorMessage }}
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { Schema } from 'yup'
import { useRouter } from '#app'
import { Model } from '#nuxt-typo3'

const props = defineProps<{
    name: string
    label?: string
    optionGroups: Model.AutocompleteOptionGroup[]
    defaultValue?: string
    validation?: Schema
    emptyLabel?: string
    required?: boolean
    placeholder?: string
    disabled?: boolean
}>()

onMounted(() => {
    input.value?.addEventListener('focus', open)
})

onUnmounted(() => {
    input.value?.removeEventListener('keydown', supportKeyboardNavigation)
    input.value?.removeEventListener('focus', open)
    document.removeEventListener('click', closeOnOutsideClick)
})

const router = useRouter()

const emit = defineEmits<{
    (e: 'input', value: string): void
}>()

const wrapper = ref<HTMLDivElement>()
const input = ref<HTMLInputElement>()
const isOpen = ref(false)
const hoverOption = ref<Model.AutocompleteOption>()

const options = computed(() =>
    props.optionGroups.flatMap((optionGroup) => optionGroup.options)
)
const name = computed(() => props.name)
const hoverOptionIndex = computed(() =>
    !hoverOption.value ? -1 : options.value.indexOf(hoverOption.value)
)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { errorMessage, value, setValue } = useField<string>(
    name,
    props.validation?.label(props.label ?? ''),
    {
        initialValue: props.defaultValue,
    }
)

function onOptionsChanged(value: Model.AutocompleteOptionGroup[]) {
    if (value.length) {
        open()
    } else {
        close()
    }
}

watch(() => props.optionGroups, onOptionsChanged)

function setHover(value?: Model.AutocompleteOption) {
    hoverOption.value = value
}

function onInput() {
    emit('input', value.value)
}

function closeOnOutsideClick(e: MouseEvent) {
    if (
        wrapper.value &&
        e.target instanceof Node &&
        !wrapper.value.contains(e.target)
    ) {
        close()
    }
}

function onSelect(option: Model.AutocompleteOption) {
    setValue(option.key)
    close()
}

function open() {
    if (isOpen.value || props.disabled || options.value.length === 0) {
        return
    }
    isOpen.value = true
    input.value?.addEventListener('keydown', supportKeyboardNavigation)
    document.addEventListener('click', closeOnOutsideClick)
}

function close() {
    if (!isOpen.value) {
        return
    }
    isOpen.value = false
    input.value?.removeEventListener('keydown', supportKeyboardNavigation)
    document.removeEventListener('click', closeOnOutsideClick)
}

function supportKeyboardNavigation(e: KeyboardEvent) {
    // press down -> go next
    if (
        e.key === 'ArrowDown' &&
        hoverOptionIndex.value < options.value.length - 1
    ) {
        e.preventDefault() // prevent page scrolling
        hoverOption.value = options.value.at(hoverOptionIndex.value + 1)
    }

    // press up -> go previous
    if (e.key === 'ArrowUp' && hoverOptionIndex.value > 0) {
        e.preventDefault() // prevent page scrolling
        hoverOption.value = options.value.at(hoverOptionIndex.value - 1)
    }

    // press Enter or space -> select the option
    if (e.key === 'Enter' || e.key === ' ') {
        if (hoverOption.value) {
            e.preventDefault()
            if (hoverOption.value.link) {
                router.push(hoverOption.value.link)
            } else {
                onSelect(hoverOption.value)
            }
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

.t3-autocomplete {
    $color-background: #fff;
    $color-border-active: #676774;
    $color-hover: #e0e0e6;
    $border-radius: 0.125rem;
    $border-width: 0.0625rem;

    position: relative;

    &__input {
        width: 100%;
        box-sizing: border-box;
    }

    &__native {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &__wrapper {
        position: relative;
    }

    &__option-groups {
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
        display: block;
        cursor: pointer;

        &--hover {
            background-color: $color-hover;
        }
    }

    &__error {
        color: $color-error;
    }

    .error-transition {
        &-enter-active,
        &-leave-active {
            transition: height $transition-duration-input-error;
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
