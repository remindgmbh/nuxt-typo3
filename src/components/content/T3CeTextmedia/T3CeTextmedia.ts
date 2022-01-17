import { CreateElement, VNode, PropType } from 'vue'
import BaseCe from '../../../mixins/components/BaseCe'
import './T3CeTextmedia.scss'

export default BaseCe.extend({
    name: 'T3CeTextmedia',
    props: {
        assets: {
            type: Array,
            required: true,
            default: () => [],
        },
        bodytext: {
            type: String,
            required: true,
            default: '',
        },
        ratio: {
            type: Number,
            required: true,
            default: 1,
        },
        assetPosition: {
            type: String as PropType<'left' | 'right'>,
            required: true,
            default: 'left',
        },
    },
    computed: {
        file(): any {
            return this.assets[0]
        },
    },
    render(createElement: CreateElement): VNode {
        const renderAsset = () => {
            return createElement(
                'div',
                {
                    class: [
                        't3-ce-textmedia__asset',
                        { 't3-ce-textmedia__asset--small': this.ratio === 2 },
                    ],
                },
                this.file
                    ? [
                          this.file.properties.type === 'video'
                              ? renderVideo()
                              : renderFile(),
                      ]
                    : []
            )
        }

        const renderVideo = () => {
            return createElement(
                'div',
                {
                    class: 't3-ce-textmedia__video-container',
                },
                [renderFile()]
            )
        }

        const renderFile = () => {
            return createElement('ce-media-file', {
                props: { file: this.file },
            })
        }

        const renderText = () => {
            return createElement(
                'div',
                {
                    class: [
                        't3-ce-textmedia__text',
                        { 't3-ce-textmedia__text--large': this.ratio === 2 },
                    ],
                },
                [
                    createElement('ce-header', { props: this.$props }),
                    createElement('html-parser', {
                        props: { content: this.bodytext },
                    }),
                ]
            )
        }

        return createElement(
            'div',
            {
                class: 't3-ce-textmedia',
            },
            this.assetPosition === 'left'
                ? [renderAsset.call(this), renderText.call(this)]
                : [renderText.call(this), renderAsset.call(this)]
        )
    },
})
