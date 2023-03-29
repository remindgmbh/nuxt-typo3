<template>
    <div
        class="t3-autocomplete t3-input"
        :class="{
            't3-autocomplete--required': required,
            't3-autocomplete--disabled': disabled,
            't3-input--required': required,
            't3-input--disabled': disabled,
        }"
    >
        <label
            v-if="label"
            :for="name"
            class="t3-autocomplete__label t3-input__label"
            >{{ label }}</label
        >
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
                                    @mouseover="hoverOption = option"
                                    @mouseleave="hoverOption = undefined"
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
                                    @mouseover="hoverOption = option"
                                    @mouseleave="hoverOption = undefined"
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
            <div
                v-if="errorMessage"
                class="t3-autocomplete__error t3-input__error"
            >
                {{ errorMessage }}
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { navigateTo } from '#app'
import { T3Model } from '#nuxt-typo3'
import { useT3SelectInput } from '#nuxt-typo3/composables/useT3SelectInput'

const props = defineProps<{
    name: string
    label?: string
    optionGroups: T3Model.AutocompleteOptionGroup[]
    defaultValue?: string
    validation?: RuleExpression<any>
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

const emit = defineEmits<{
    (e: 'input', value: string): void
}>()

const wrapper = ref<HTMLDivElement>()
const input = ref<HTMLInputElement>()
const isOpen = ref(false)
const optionGroups = ref<T3Model.AutocompleteOptionGroup[]>([])

const options = computed(() =>
    props.optionGroups.flatMap((optionGroup) => optionGroup.options)
)
const name = computed(() => props.name)

function onKeyboardSelect(hoverOption: T3Model.AutocompleteOption) {
    if (hoverOption.value.link) {
        return navigateTo(hoverOption.value.link)
    } else {
        onSelect(hoverOption.value)
    }
}

const { hoverOption, supportKeyboardNavigation } = useT3SelectInput(
    onKeyboardSelect,
    options
)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { errorMessage, value, setValue } = useField<string>(
    name,
    props.validation,
    {
        initialValue: props.defaultValue,
    }
)

function onOptionsChanged(value: T3Model.AutocompleteOptionGroup[]) {
    if (value.length) {
        optionGroups.value = value
        open()
    } else {
        close()
    }
}

watch(() => props.optionGroups, onOptionsChanged)

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

function onSelect(option: T3Model.AutocompleteOption) {
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
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/colors' as colors;
@use '#nuxt-typo3/assets/styles/transition-durations' as transition-durations;

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
        color: colors.$error;
    }

    .error-transition {
        &-enter-active,
        &-leave-active {
            transition: height transition-durations.$input-error;
        }
    }

    .options-transition {
        &-enter-active,
        &-leave-active {
            transition: height transition-durations.$select;
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
