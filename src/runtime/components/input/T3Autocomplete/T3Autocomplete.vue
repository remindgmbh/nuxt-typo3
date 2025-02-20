<template>
    <div ref="el" class="t3-autocomplete">
        <T3Input
            v-model="input"
            :aria-errormessage="ariaErrormessage"
            :aria-invalid="ariaInvalid"
            :aria-label="ariaLabel"
            autocomplete="off"
            class="t3-autocomplete__input"
            :disabled="disabled"
            :name="name"
            :placeholder="placeholder"
            type="text"
            @blur="onBlur"
            @focus="onFocus"
            @input="onInput"
            @keydown="supportKeyboardNavigation"
        />
        <Transition name="options-transition">
            <div
                v-show="isOpen && options.length > 0"
                class="t3-autocomplete__options"
            >
                <T3AutocompleteOptionGroup
                    v-for="optionGroup in optionGroups"
                    :key="optionGroup.name"
                    v-model:hover-option="hoverOption"
                    :option-group="optionGroup"
                    :value="value"
                    @select="onSelect"
                />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'
import { type T3Model, navigateTo } from '#imports'
import { computed, ref, watch } from 'vue'

export interface Props {
    ariaErrormessage?: string
    ariaInvalid?: boolean
    ariaLabel?: string
    defaultValue?: T3Model.Input.Autocomplete.Option
    disabled?: boolean
    name: string
    optionGroups: T3Model.Input.Autocomplete.OptionGroup[]
    placeholder?: string
    validation?: RuleExpression<any>
}

export interface Emits {
    input: [value: T3Model.Input.Autocomplete.Option]
    select: [value: T3Model.Input.Autocomplete.Option]
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const model = defineModel<T3Model.Input.Autocomplete.Option>({
    default: { key: '', label: '' },
})

const input = computed({
    get() {
        return value.value.label
    },
    set(value: string) {
        setValue({ key: '', label: value })
    },
})

const el = ref<HTMLDivElement>()
const isOpen = ref(false)
const hoverOption = ref<T3Model.Input.Autocomplete.Option>()
const hoverOptionIndex = computed<number>(() =>
    options.value.findIndex((value) => hoverOption.value === value),
)

const options = computed(() =>
    props.optionGroups.flatMap((optionGroup) => optionGroup.options),
)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, handleBlur, setValue } =
    useField<T3Model.Input.Autocomplete.Option>(
        () => props.name,
        props.validation,
        {
            initialValue: props.defaultValue ?? model.value,
        },
    )

if (props.defaultValue) {
    model.value = props.defaultValue
}

// use two watchers as syncVModel from vee-validate does not seem to work: https://github.com/logaretm/vee-validate/issues/4962
watch(value, (newValue) => {
    if (newValue !== model.value) {
        model.value = newValue
    }
})

watch(model, (newValue) => {
    if (newValue !== value.value) {
        value.value = newValue
    }
})

function onInput() {
    open()
    emit('input', value.value)
}

function onSelect(option: T3Model.Input.Autocomplete.Option) {
    setValue(option)
    emit('select', option)
}

function onFocus() {
    open()
}

function onBlur(e: Event) {
    close()
    handleBlur(e)
}

function open() {
    isOpen.value = true
}

function close() {
    isOpen.value = false
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
            close()
        }
    }

    // press ESC -> close autocomplete
    if (['Escape'].includes(e.key)) {
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
}
</style>
