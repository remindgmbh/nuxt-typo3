<template>
    <fieldset
        class="t3-checkbox-group"
        :class="{
            't3-checkbox-group--required': required,
            't3-checkbox-group--disabled': disabled,
            't3-checkbox-group--error': meta.touched && !meta.valid,
            't3-checkbox-group--success': meta.touched && meta.valid,
        }"
    >
        <T3InputLabel
            class="t3-checkbox-group__label"
            :label="label"
            tag="legend"
        />
        <div class="t3-checkbox-group__options">
            <div
                v-for="(optionLabel, optionValue) in options"
                :key="optionValue"
                class="t3-checkbox-group__option"
            >
                <input
                    :id="optionValue.toString()"
                    v-model="value"
                    class="t3-checkbox-group__option-value"
                    :disabled="disabled"
                    :name="name"
                    type="checkbox"
                    :value="optionValue.toString()"
                    @blur="handleBlur"
                />
                <label
                    class="t3-checkbox-group__option-label"
                    :for="optionValue.toString()"
                    >{{ optionLabel }}</label
                >
            </div>
        </div>
        <slot :error-message="errorMessage" name="error"></slot>
    </fieldset>
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
    name: string
    label?: string
    options: { [key: string]: string }
    defaultValue?: string[]
    validation?: RuleExpression<any>
    disabled?: boolean
    required?: boolean
}>()

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { errorMessage, meta, value, handleBlur } = useField<
    string[] | boolean | undefined
>(name, props.validation, {
    initialValue: props.defaultValue ?? [],
    type: 'checkbox',
})
</script>

<style lang="scss">
.t3-checkbox-group {
    margin: 0;

    &__options {
        display: flex;
    }
}
</style>
