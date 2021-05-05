<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'CeBackground',
    functional: true,
    props: {
        background: {
            type: String,
            required: true,
        },
    },
    render(createElement, context) {
        return createElement(
            'div',
            {
                class: `ce-background ce-background--${context.props.background}`,
            },
            context.children
        )
    },
})
</script>
<style lang="scss">
@import 'rmnd-nuxt-typo3/src/assets/styles/defaults.scss';

.ce-background {
    &--primary {
        background-color: var(--color-primary, #{$color-primary});
    }

    &--secondary {
        background-color: var(--color-secondary, #{$color-secondary});
    }

    &--accent {
        background-color: var(--color-accent, #{$color-accent});
    }
}
</style>
