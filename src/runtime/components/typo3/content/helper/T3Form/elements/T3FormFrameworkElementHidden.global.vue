<template>
    <input :id="name" v-model="value" :name="name" type="hidden" />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { type Props } from '@remindgmbh/nuxt-typo3/components/typo3/content/helper/T3Form/T3FormFrameworkElement.vue'
import { useField } from 'vee-validate'

const props = defineProps<Props>()

const name = computed(() => props.formElement.name)

// computed property required: https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#reactive-field-names-with-usefield
const { value, setValue } = useField<string | undefined>(name, undefined, {
    initialValue: props.formElement.defaultValue,
})

watch(
    () => props.formElement.defaultValue,
    (value) => setValue(value),
)
</script>
