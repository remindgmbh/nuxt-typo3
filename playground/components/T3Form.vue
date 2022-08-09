<script lang="ts">
import T3Form from '../../src/runtime/components/ui/T3Form/T3Form.vue'
export default T3Form
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
