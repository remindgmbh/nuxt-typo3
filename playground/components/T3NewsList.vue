<script lang="ts">
import T3NewsList from '../../src/runtime/components/content/elements/news/T3NewsList.vue'
export default T3NewsList
</script>

<style lang="scss">
.t3-news-list {
    &__elements {
        padding: 1rem 0 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    &__header {
        font-weight: 600;
    }
}
</style>
