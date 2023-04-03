<script lang="ts">
export { default } from '#nuxt-typo3/components/ui/T3Tabs.vue'
</script>

<style lang="scss">
.t3-tabs {
    &__contents {
        transition: height 1s;
    }

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
</style>
