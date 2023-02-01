<script lang="ts">
export { default } from '#nuxt-typo3/components/ui/T3Form/T3Form.vue'
</script>

<style lang="scss">
.t3-form {
    &__submit {
        &--loading {
            &::after {
                content: '...';
            }
        }
    }
}
</style>
