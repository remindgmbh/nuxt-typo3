<script lang="ts">
export { default } from '#nuxt-typo3/components/ui/T3Form/T3Form.vue'
</script>

<style lang="scss">
@use '@/assets/variables' as *;

.t3-form {
    &__submit--loading & {
        &__submit-label {
            display: none;
        }
    }

    &__submit {
        &--loading {
            &::after {
                content: '...';
            }
        }
    }
}
</style>
