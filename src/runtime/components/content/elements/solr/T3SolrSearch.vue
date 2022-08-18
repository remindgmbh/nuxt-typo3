<template>
    <div class="t3-solr-search">
        <T3Header :content-element="contentElement" />
        <form class="t3-solr-search__form" @submit="submit">
            <T3Autocomplete
                class="t3-solr-search__input"
                :disabled="loading"
                :name="inputName"
                :placeholder="placeholder"
                :default-value="defaultValue"
                :option-groups="optionGroups"
                @input="onInput"
            />
            <button
                class="t3-solr-search__submit"
                type="submit"
                :disabled="loading"
            >
                <span class="t3-solr-search__submit-label">{{
                    submitLabel
                }}</span>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { Api, useSolrSearch } from '#nuxt-typo3'

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
} = useSolrSearch(props.contentElement.content)
</script>

<style lang="scss">
.t3-solr-search {
    &__form {
        display: flex;
    }

    &__input {
        flex-grow: 1;
    }
}
</style>
