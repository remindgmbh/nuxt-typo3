<script lang="ts">
import T3CeSolrPiSearch from '../../src/runtime/components/content/elements/solr/T3CeSolrPiSearch.vue'
export default T3CeSolrPiSearch
</script>

<style lang="scss">
.t3-ce-solr-search {
    .t3-form {
        display: flex;

        &__submit {
            padding: 0 1rem;

            &::after {
                content: '🔎︎';
            }

            &--loading {
                &::after {
                    content: '...';
                }
            }
        }

        &__submit-label {
            display: none;
        }
    }
}
</style>
