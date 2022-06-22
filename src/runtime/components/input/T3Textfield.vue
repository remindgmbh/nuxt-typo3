<template>
    <div class="t3-textfield">
        <label class="t3-textfield__label" :for="name">{{ label }}</label>
        <input
            :id="name"
            v-model="value"
            class="t3-textfield__input"
            :type="type"
            :name="name"
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
import * as yup from 'yup'

const props = defineProps<{
    name: string
    label?: string
    type: string
    validation?: yup.Schema
    defaultValue?: string | number
}>()

const name = computed(() => props.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, errorMessage } = useField(name, props.validation, {
    initialValue: props.defaultValue,
})
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

    .collapse-transition {
        &-enter-active,
        &-leave-active {
            transition: height $transition-duration-input-error;
        }
    }
}
</style>
