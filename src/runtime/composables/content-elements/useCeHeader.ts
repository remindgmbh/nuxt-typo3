import { h } from 'vue'
import { Content } from 'src/api'

export const useCeHeader = (
    props: Readonly<{
        id: number
        content: Content
    }>
) => {
    const visible = computed(
        () => props.content.header && props.content.headerLayout !== 100
    )

    const tag = computed(() =>
        props.content.headerLayout > 0 && props.content.headerLayout < 6
            ? `h${props.content.headerLayout}`
            : 'div'
    )

    // TODO remove render functions
    const renderSubheader = () =>
        props.content.subheader
            ? h('div', { class: 't3-ce-header__sub' }, [
                  props.content.subheader,
              ])
            : undefined

    const renderHeader = () =>
        h(
            tag.value,
            {
                class: 't3-ce-header__main',
            },
            props.content.headerLink
                ? [
                      h(
                          't3-typolink',
                          { props: { to: props.content.headerLink } },
                          [props.content.header]
                      ),
                  ]
                : [props.content.header]
        )

    const render = () =>
        h(
            'header',
            {
                class: [
                    't3-ce-header',
                    {
                        [`text-${props.content.headerPosition}`]:
                            props.content.headerPosition,
                    },
                ],
            },
            [renderSubheader(), renderHeader()]
        )

    return {
        render,
        tag,
        visible,
    }
}
