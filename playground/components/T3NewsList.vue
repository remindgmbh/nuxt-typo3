<script lang="ts">
export { default } from '#nuxt-typo3/components/content/elements/news/T3NewsList.vue'
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
