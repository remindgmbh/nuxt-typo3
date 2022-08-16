<script lang="ts">
export { T3Checkbox as default } from '#nuxt-typo3'
</script>

<style lang="scss">
@use '@/assets/variables' as *;

.t3-checkbox {
    &__input {
        appearance: none;
        width: 1rem;
        height: 1rem;
        margin: 0;
        position: relative;

        &::before {
            width: 100%;
            height: 100%;
            border: solid 1px $color-accent;
            content: '';
            position: absolute;
            box-sizing: border-box;
        }

        &:checked {
            &::before {
                background-color: $color-primary;
            }
        }
    }
}
</style>
