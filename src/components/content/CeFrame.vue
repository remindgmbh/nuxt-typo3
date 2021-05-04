<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'CeFrame',
    functional: true,
    props: {
        spaceAfter: {
            type: String,
            required: false,
            default: 'default',
        },
        spaceBefore: {
            type: String,
            required: false,
            default: 'default',
        },
        frameClass: {
            type: String,
            required: false,
            default: '',
        },
    },
    render(createElement, context) {
        return createElement(
            'div',
            {
                class: [
                    'ce-frame',
                    {
                        'ce-frame--width-auto':
                            context.props.frameClass === 'none',
                    },
                    {
                        [`ce-frame--space-before-${context.props.spaceBefore}`]: context
                            .props.spaceBefore,
                    },
                    {
                        [`ce-frame--space-after-${context.props.spaceAfter}`]: context
                            .props.spaceAfter,
                    },
                ],
            },
            context.children
        )
    },
})
</script>
<style lang="scss">
@import 'rmnd-nuxt-typo3/src/assets/styles/defaults.scss';

.ce-frame {
    $spaces: (
        'extra-small': var(--space-extra-small, 0.5rem),
        'small': var(--space-small, 1rem),
        'medium': var(--space-medium, 2rem),
        'large': var(--space-large, 4rem),
        'extra-large': var(--space-extra-large, 8rem),
    );

    @each $name, $value in $spaces {
        &--space-before-#{$name} {
            margin-top: $value;
        }
        &--space-after-#{$name} {
            margin-bottom: $value;
        }
    }

    width: var(--container-width, #{$container-width});
    max-width: 100%;
    margin: 0 auto;
    padding: var(--ce-frame-padding, #{$ce-frame-padding});

    &--width-auto {
        width: auto;
    }
}
</style>
