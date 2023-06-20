<script lang="ts">
export { default } from '#nuxt-typo3/components/typo3/content/helper/T3Accordion.vue'
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
