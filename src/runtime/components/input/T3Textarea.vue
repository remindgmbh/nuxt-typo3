<template>
    <div
        class="textarea"
        :class="{
            'textarea--required': required,
            'textarea--disabled': disabled,
            'textarea--error': meta.touched && !meta.valid,
            'textarea--success': meta.touched && meta.valid,
        }"
    >
        <component
            :is="InputLabel"
            class="textarea__label"
            :label="label"
            :for="name"
        />
        <div class="textarea__wrapper">
            <textarea
                :id="name"
                v-model="value"
                class="textarea__input"
                :name="name"
                :placeholder="placeholder"
                :disabled="disabled"
                @blur="handleBlur"
            />
        </div>
        <slot name="error" :error-message="errorMessage"></slot>
    </div>
</template>

<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'
import { useT3DynamicComponent } from '#imports'
import { T3InputLabel } from '#components'

const props = defineProps<{
    name: string
    label?: string
    validation?: RuleExpression<any>
    defaultValue?: string | number
    placeholder?: string
    disabled?: boolean
    required?: boolean
}>()

const InputLabel = useT3DynamicComponent<typeof T3InputLabel>('InputLabel')

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, errorMessage, meta, handleBlur } = useField(
    name,
    props.validation,
    {
        initialValue: props.defaultValue,
    }
)
</script>

<style lang="scss">
.textarea {
    &__input {
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
