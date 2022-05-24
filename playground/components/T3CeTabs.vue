<script lang="ts">
import T3CeTabs from '../../src/runtime/components/content/elements/T3CeTabs.vue'
export default T3CeTabs
</script>

<style lang="scss">
.t3-ce-tabs {
    .t3-tabs {
        &__contents {
            transition: height 1s;
        }

        .tab-change {
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
