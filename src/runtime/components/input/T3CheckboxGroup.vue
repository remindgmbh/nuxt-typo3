<template>
    <fieldset
        class="checkbox-group"
        :class="{
            'checkbox-group--required': required,
            'checkbox-group--disabled': disabled,
            'checkbox-group--error': meta.touched && !meta.valid,
            'checkbox-group--success': meta.touched && meta.valid,
        }"
    >
        <component
            :is="InputLabel"
            class="checkbox-group__label"
            :label="label"
            tag="legend"
        />
        <div class="checkbox-group__options">
            <div
                v-for="(optionLabel, optionValue) in options"
                :key="optionValue"
                class="checkbox-group__option"
            >
                <input
                    :id="optionValue.toString()"
                    v-model="value"
                    class="checkbox-group__option-value"
                    type="checkbox"
                    :name="name"
                    :value="optionValue.toString()"
                    :disabled="disabled"
                    @blur="handleBlur"
                />
                <label
                    class="checkbox-group__option-label"
                    :for="optionValue.toString()"
                    >{{ optionLabel }}</label
                >
            </div>
        </div>
        <slot name="error" :error-message="errorMessage"></slot>
    </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RuleExpression, useField } from 'vee-validate'
import { useT3DynamicComponent } from '#imports'
import { T3InputLabel } from '#components'

const props = defineProps<{
    name: string
    label?: string
    options: { [key: string]: string }
    defaultValue?: string[]
    validation?: RuleExpression<any>
    disabled?: boolean
    required?: boolean
}>()

const InputLabel = useT3DynamicComponent<typeof T3InputLabel>('InputLabel')

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { errorMessage, meta, value, handleBlur } = useField<
    string[] | boolean | undefined
>(name, props.validation, {
    type: 'checkbox',
    initialValue: props.defaultValue ?? [],
})
</script>

<style lang="scss">
.checkbox-group {
    margin: 0;

    &__options {
        display: flex;
    }
}
</style>
