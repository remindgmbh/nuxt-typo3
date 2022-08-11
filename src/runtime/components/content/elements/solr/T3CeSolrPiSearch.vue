<template>
    <div class="t3-ce-solr-search">
        <T3CeHeader :content-element="contentElement" />
        <form class="t3-ce-solr-search__form" @submit="submit">
            <T3Autocomplete
                class="t3-ce-solr-search__input"
                :disabled="loading"
                :name="inputName"
                :placeholder="placeholder"
                :default-value="defaultValue"
                :option-groups="optionGroups"
                @input="onInput"
            />
            <button
                class="t3-ce-solr-search__submit"
                type="submit"
                :disabled="loading"
            >
                <span class="t3-ce-solr-search__submit-label">{{
                    submitLabel
                }}</span>
            </button>
        </form>
    </div>
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
    &__form {
        display: flex;
    }

    &__input {
        flex-grow: 1;
    }
}
</style>
