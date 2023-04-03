<script lang="ts">
export { default } from '#nuxt-typo3/components/ui/T3Accordion.vue'
</script>

<style lang="scss">
.t3-accordion {
    .collapse-transition {
        &-enter-active,
        &-leave-active {
            transition: height 1s;
        }
    }
}
</style>
