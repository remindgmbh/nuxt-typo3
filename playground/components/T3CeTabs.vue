<script lang="ts">
export { default } from '#nuxt-typo3/components/content/elements/T3CeTabs.vue'
</script>

<style lang="scss">
.t3-ce-tabs {
    .t3-tabs {
        .tab-change-transition {
            &-enter-active,
            &-leave-active {
                transition: opacity 0.5s;
            }

            &-enter-from,
            &-leave-to {
                opacity: 0;
            }

            &-enter-to,
            &-leave-from {
                opacity: 1;
            }
        }
    }
}
</style>
