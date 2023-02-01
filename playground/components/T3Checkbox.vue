<script lang="ts">
export { default } from '#nuxt-typo3/components/input/T3Checkbox.vue'
</script>

<style lang="scss">
@use '@/assets/colors';

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
            border: solid 1px colors.$accent;
            content: '';
            position: absolute;
            box-sizing: border-box;
        }

        &:checked {
            &::before {
                background-color: colors.$primary;
            }
        }
    }
}
</style>
