<template>
    <div
        class="t3-textarea"
        :class="{
            't3-textarea--required': required,
            't3-textarea--disabled': disabled,
        }"
    >
        <label class="t3-textarea__label" :for="name">{{ label }}</label>
        <textarea
            :id="name"
            v-model="value"
            class="t3-textarea__input"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
        />
        <T3CollapseTransition>
            <div v-if="errorMessage" class="t3-textarea__error">
                {{ errorMessage }}
            </div>
        </T3CollapseTransition>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import { Schema } from 'yup'

const props = defineProps<{
    name: string
    label?: string
    validation?: Schema
    defaultValue?: string | number
    required?: boolean
    placeholder?: string
    disabled?: boolean
}>()

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, errorMessage } = useField(
    name,
    props.validation?.label(props.label ?? ''),
    {
        initialValue: props.defaultValue,
    }
)
</script>

<style lang="scss">
@use '#nuxt-typo3/assets/styles/variables' as *;

.t3-textarea {
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
