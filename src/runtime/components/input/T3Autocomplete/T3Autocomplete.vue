<template>
    <div
        class="t3-autocomplete"
        :class="{
            't3-autocomplete--required': required,
            't3-autocomplete--disabled': disabled,
            't3-autocomplete--error': meta.touched && !meta.valid,
            't3-autocomplete--success': meta.touched && meta.valid,
        }"
    >
        <T3InputLabel
            v-if="label"
            class="t3-autocomplete__label"
            :label="label"
            :for="name"
        />
        <div ref="wrapper" class="t3-autocomplete__wrapper">
            <T3Input
                ref="input"
                v-model="value"
                :name="name"
                class="t3-autocomplete__input"
                :disabled="disabled"
                :placeholder="placeholder"
                autocomplete="off"
                @input="onInput"
                @blur="handleBlur"
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
        <slot name="error" :error-message="errorMessage"></slot>
    </div>
</template>

<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { navigateTo, T3Model, useT3SelectInput } from '#imports'
import { T3Input } from '#components'

const props = defineProps<{
    name: string
    label?: string
    optionGroups: T3Model.Input.Autocomplete.OptionGroup[]
    defaultValue?: string
    validation?: RuleExpression<any>
    emptyLabel?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
}>()

onMounted(() => {
    input.value?.$el.addEventListener('focus', open)
})

onUnmounted(() => {
    input.value?.$el.removeEventListener('keydown', supportKeyboardNavigation)
    input.value?.$el.removeEventListener('focus', open)
    document.removeEventListener('click', closeOnOutsideClick)
})

const emit = defineEmits<{
    (e: 'input', value: string): void
}>()

const wrapper = ref<HTMLDivElement>()
const input = ref<InstanceType<typeof T3Input>>()
const isOpen = ref(false)
const _optionGroups = ref<T3Model.Input.Autocomplete.OptionGroup[]>([])

const options = computed(() =>
    props.optionGroups.flatMap((optionGroup) => optionGroup.options)
)
const name = computed(() => props.name)

function onKeyboardSelect(hoverOption: T3Model.Input.Autocomplete.Option) {
    if (hoverOption.link) {
        return navigateTo(hoverOption.link)
    } else {
        onSelect(hoverOption)
    }
}

const { hoverOption, supportKeyboardNavigation } = useT3SelectInput(
    onKeyboardSelect,
    options
)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { errorMessage, meta, value, handleBlur, setValue } = useField<string>(
    name,
    props.validation,
    {
        initialValue: props.defaultValue,
    }
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
    if (
        wrapper.value &&
        e.target instanceof Node &&
        !wrapper.value.contains(e.target)
    ) {
        close()
    }
}

function onSelect(option: T3Model.Input.Autocomplete.Option) {
    handleBlur()
    setValue(option.key)
    close()
}

function open() {
    if (isOpen.value || props.disabled || options.value.length === 0) {
        return
    }
    isOpen.value = true
    input.value?.$el.addEventListener('keydown', supportKeyboardNavigation)
    document.addEventListener('click', closeOnOutsideClick)
}

function close() {
    if (!isOpen.value) {
        return
    }
    isOpen.value = false
    input.value?.$el.removeEventListener('keydown', supportKeyboardNavigation)
    document.removeEventListener('click', closeOnOutsideClick)
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

    &__wrapper {
        position: relative;
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
