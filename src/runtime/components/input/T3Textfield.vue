<template>
    <div
        class="t3-textfield"
        :class="{
            't3-textfield--required': required,
            't3-textfield--disabled': disabled,
        }"
    >
        <label class="t3-textfield__label" :for="name">{{ label }}</label>
        <input
            :id="name"
            v-model="value"
            class="t3-textfield__input"
            :type="type"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
        />
        <T3CollapseTransition>
            <div v-if="errorMessage" class="t3-textfield__error">
                {{ errorMessage }}
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import { Schema, date } from 'yup'
import { useInputUtil } from '#nuxt-typo3'

const { parseDateString } = useInputUtil()

const props = defineProps<{
    name: string
    label?: string
    type: string
    validation?: Schema
    defaultValue?: string | number
    required?: boolean
    placeholder?: string
    disabled?: boolean
}>()

const validation = computed(() => {
    let typeValidation: Schema | undefined
    switch (props.type) {
        case 'date':
            typeValidation = date()
                .transform(parseDateString)
                .default(undefined)
            break
        default:
            typeValidation = undefined
    }

    if (typeValidation && props.validation) {
        typeValidation = typeValidation.concat(props.validation)
    }

    return typeValidation ?? props.validation
})

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, errorMessage } = useField(
    name,
    validation.value?.label(props.label ?? ''),
    {
        initialValue: props.defaultValue,
    }
)
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

.t3-textfield {
    &__error {
        color: $color-error;
    }

    &__input {
        width: 100%;
        box-sizing: border-box;
    }

    &--required & {
        &__label {
            &::after {
                content: '*';
            }
        }
    }

    .collapse-transition {
        &-enter-active,
        &-leave-active {
            transition: height $transition-duration-input-error;
        }
    }
}
</style>
