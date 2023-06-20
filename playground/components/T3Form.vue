<script lang="ts">
export { default } from '#nuxt-typo3/components/typo3/content/helper/T3Form/T3Form.vue'
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

    .t3-input {
        .error-transition {
            &-enter-active,
            &-leave-active {
                transition: height 0.5s;
            }
        }
    }
}
</style>
