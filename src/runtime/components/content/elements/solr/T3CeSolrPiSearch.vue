<template>
    <form class="t3-ce-solr-search" @submit="submit">
        <T3Autocomplete
            class="t3-ce-solr-search__input"
            :disabled="loading"
            :name="inputName"
            :placeholder="placeholder"
            :default-value="defaultValue"
            :option-groups="optionGroups"
            @input="onInput"
        />
        <button class="t3-ce-solr-search__submit" type="submit">
            <span class="t3-ce-solr-search__submit-label">{{
                submitLabel
            }}</span>
        </button>
    </form>
</template>

<script setup lang="ts">
import { Api, useCeSolrPiSearch } from '#nuxt-typo3'

const props = defineProps<{
    contentElement: Api.ContentElement<
        Api.Content.SolrSearch | Api.Content.SolrResults
    >
}>()

const {
    defaultValue,
    inputName,
    loading,
    optionGroups,
    placeholder,
    submitLabel,
    onInput,
    submit,
} = useCeSolrPiSearch(props.contentElement.content)
</script>

<style lang="scss">
.t3-ce-solr-search {
    display: flex;

    &__input {
        flex-grow: 1;
    }
}
</style>
