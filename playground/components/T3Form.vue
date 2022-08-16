<script lang="ts">
export { T3Form as default } from '#nuxt-typo3'
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
