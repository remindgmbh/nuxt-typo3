<template>
    <div ref="el" class="t3-autocomplete">
        <T3Input
            v-model="value"
            :aria-errormessage="ariaErrormessage"
            :aria-invalid="ariaInvalid"
            autocomplete="off"
            class="t3-autocomplete__input"
            :disabled="disabled"
            :name="name"
            :placeholder="placeholder"
            type="text"
            @blur="handleBlur"
            @focus="open"
            @input="onInput"
            @keydown="supportKeyboardNavigation"
        />
        <T3CollapseTransition transition-name="options-transition">
            <div v-show="isOpen" class="t3-autocomplete__options">
                <T3AutocompleteOptionGroup
                    v-for="optionGroup in optionGroups"
                    :key="optionGroup.name"
                    v-model:hover-option="hoverOption"
                    :option-group="optionGroup"
                    :value="value"
                    @select="onSelect"
                />
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'
import { type T3Model, navigateTo } from '#imports'
import { computed, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
    ariaErrormessage?: string
    ariaInvalid?: boolean
    name: string
    optionGroups: T3Model.Input.Autocomplete.OptionGroup[]
    defaultValue?: string
    validation?: RuleExpression<any>
    placeholder?: string
    disabled?: boolean
}>()

const emit = defineEmits<{
    input: [value: string]
    select: [value: T3Model.Input.Autocomplete.Option]
}>()

onUnmounted(() => {
    document.removeEventListener('click', closeOnOutsideClick)
})

const el = ref<HTMLDivElement>()
const isOpen = ref(false)
const hoverOption = ref<T3Model.Input.Autocomplete.Option>()
const hoverOptionIndex = computed<number>(() =>
    options.value.findIndex((value) => hoverOption.value === value),
)
const _optionGroups = ref<T3Model.Input.Autocomplete.OptionGroup[]>([])

const options = computed(() =>
    props.optionGroups.flatMap((optionGroup) => optionGroup.options),
)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, handleBlur, setValue } = useField<string>(
    () => props.name,
    props.validation,
    {
        initialValue: props.defaultValue,
    },
)

watch(
    () => props.defaultValue,
    (value) => setValue(value ?? ''),
)

function onOptionsChanged(value: T3Model.Input.Autocomplete.OptionGroup[]) {
    if (value.length) {
        _optionGroups.value = value
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
    if (el.value && e.target instanceof Node && !el.value.contains(e.target)) {
        close()
    }
}

function onSelect(option: T3Model.Input.Autocomplete.Option) {
    handleBlur()
    setValue(option.key)
    close()
    emit('select', option)
}

function open() {
    if (isOpen.value || props.disabled || options.value.length === 0) {
        return
    }
    isOpen.value = true
    document.addEventListener('click', closeOnOutsideClick)
}

function close() {
    if (!isOpen.value) {
        return
    }
    isOpen.value = false
    document.removeEventListener('click', closeOnOutsideClick)
}

function supportKeyboardNavigation(e: KeyboardEvent): void {
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

    // press Enter -> select the option
    if (e.key === 'Enter') {
        if (hoverOption.value !== undefined) {
            e.preventDefault()
            if (hoverOption.value.link) {
                navigateTo(hoverOption.value.link)
            } else {
                onSelect(hoverOption.value)
            }
        }
    }

    // press ESC or Tab -> close selectCustom
    if (['Escape', 'Tab'].includes(e.key)) {
        close()
    }
}
</script>

<style lang="scss">
.t3-autocomplete {
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

    &__options {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 1;
        box-sizing: border-box;
    }

    // set transition for opening options
    // .options-transition {
    //     &-enter-active,
    //     &-leave-active {
    //         transition: height ...;
    //     }
    // }
}
</style>
