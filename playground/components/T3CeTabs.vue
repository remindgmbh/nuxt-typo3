<script lang="ts">
export { T3CeTabs as default } from '#nuxt-typo3'
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
