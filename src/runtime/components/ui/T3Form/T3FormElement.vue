<template>
    <div
        class="t3-form-element"
        :class="[
            `t3-form-element--${formElement.type}`,
            {
                [`t3-form-element--size-${formElement.size}`]: formElement.size,
            },
            { 't3-form-element--required': formElement.required },
            { 't3-form-element--success': touched && valid },
            { 't3-form-element--error': touched && !valid },
        ]"
    >
        <T3FormStaticText
            v-if="formElement.isStaticText()"
            :header="formElement.label"
            :text="formElement.text"
        />
        <T3RadioGroup
            v-else-if="formElement.isRadioGroup()"
            :name="formElement.name"
            :options="formElement.options"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :disabled="loading"
        >
            <template #error="{ errorMessage }">
                <slot name="error" :error-message="errorMessage"></slot>
            </template>
        </T3RadioGroup>
        <T3CheckboxGroup
            v-else-if="formElement.isCheckboxGroup()"
            :name="formElement.name"
            :options="formElement.options"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :disabled="loading"
        >
            <template #error="{ errorMessage }">
                <slot
                    name="error"
                    :error-message="errorMessage"
                ></slot> </template
        ></T3CheckboxGroup>
        <T3Checkbox
            v-else-if="formElement.type === 'checkbox'"
            :name="formElement.name"
            :label="formElement.label ?? formElement.name"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :disabled="loading"
        >
            <template #error="{ errorMessage }">
                <slot name="error" :error-message="errorMessage"></slot>
            </template>
        </T3Checkbox>
        <T3Select
            v-else-if="formElement.isSelect()"
            :name="formElement.name"
            :options="formElement.options"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :empty-label="formElement.emptyLabel"
            :disabled="loading"
        >
            <template #error="{ errorMessage }">
                <slot
                    name="error"
                    :error-message="errorMessage"
                ></slot> </template
        ></T3Select>
        <T3Textarea
            v-else-if="formElement.type === 'textarea'"
            :name="formElement.name"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :placeholder="formElement.placeholder"
            :disabled="loading"
        >
            <template #error="{ errorMessage }">
                <slot
                    name="error"
                    :error-message="errorMessage"
                ></slot> </template
        ></T3Textarea>
        <T3Textfield
            v-else
            :name="formElement.name"
            :label="formElement.label"
            :default-value="formElement.defaultValue"
            :validation="formElement.validation"
            :type="formElement.type"
            :placeholder="formElement.placeholder"
            :disabled="loading"
            :step="formElement.isNumber() ? formElement.step : undefined"
            :min="formElement.isNumber() ? formElement.min : undefined"
            :max="formElement.isNumber() ? formElement.max : undefined"
        >
            <template #error="{ errorMessage }">
                <slot name="error" :error-message="errorMessage"></slot>
            </template>
        </T3Textfield>
    </div>
</template>

<script setup lang="ts">
import { useIsFieldTouched, useIsFieldValid } from 'vee-validate'
import { computed, onMounted, ref, Ref } from 'vue'
import { T3Model } from '#imports'

const props = defineProps<{
    formElement: T3Model.FormElement.Base
    loading?: boolean
}>()

const name = computed(() => props.formElement.name)

const touched = ref<Ref<boolean>>()
const valid = ref<Ref<boolean>>()

onMounted(() => {
    touched.value = useIsFieldTouched(name)
    valid.value = useIsFieldValid(name)
})
</script>

<style lang="scss">
.t3-form-element {
    &--hidden {
        display: none;
    }

    &--size-25 {
        width: 25%;
    }

    &--size-33 {
        width: calc(100% / 3);
    }

    &--size-50 {
        width: 50%;
    }

    &--size-66 {
        width: calc(100% / 3 * 2);
    }

    &--size-75 {
        width: 75%;
    }

    &--required {
        .t3-input {
            &__label {
                &::after {
                    content: '*';
                }
            }
        }
    }
}
</style>
