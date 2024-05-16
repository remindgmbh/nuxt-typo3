<template>
    <div
        class="t3-autocomplete-option-group"
        :class="`t3-autocomplete-option-group--${optionGroup.name}`"
    >
        <div
            v-if="optionGroup.label"
            class="t3-autocomplete-option-group__label"
        >
            {{ optionGroup.label }}
        </div>
        <div class="t3-autocomplete-option-group__items">
            <template v-for="option in optionGroup.options" :key="option.key">
                <T3AutocompleteOption
                    :hovered="hoverOption === option"
                    :option="option"
                    :selected="value === option.key"
                    @click="() => emit('select', option)"
                    @mouseleave="() => emit('update:hoverOption', undefined)"
                    @mouseover="() => emit('update:hoverOption', option)"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type T3Model } from '#imports'

defineProps<{
    optionGroup: T3Model.Input.Autocomplete.OptionGroup
    value: string
    hoverOption?: T3Model.Input.Autocomplete.Option
}>()

const emit = defineEmits<{
    (e: 'select', option: T3Model.Input.Autocomplete.Option): void
    (e: 'update:hoverOption', option?: T3Model.Input.Autocomplete.Option): void
}>()
</script>
