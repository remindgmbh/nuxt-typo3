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
                    :selected="value.key === option.key"
                    @click="() => emit('select', option)"
                    @mouseleave="() => emit('update:hoverOption', undefined)"
                    @mouseover="() => emit('update:hoverOption', option)"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { T3Model } from '#imports'

export interface Props {
    hoverOption?: T3Model.Input.Autocomplete.Option
    optionGroup: T3Model.Input.Autocomplete.OptionGroup
    value: T3Model.Input.Autocomplete.Option
}

export interface Emits {
    select: [option: T3Model.Input.Autocomplete.Option]
    'update:hoverOption': [option?: T3Model.Input.Autocomplete.Option]
}

defineProps<Props>()

const emit = defineEmits<Emits>()
</script>
