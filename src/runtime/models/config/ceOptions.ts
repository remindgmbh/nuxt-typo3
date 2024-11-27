import type { Typo3 } from '../index'
export interface CeOptions {
    // use alternative name for component
    componentName?: string
    // if set to true, content element is shown even if cookie should block it
    // required if not the whole content element should be blocked by cookie,
    // but only one part, for example a video in a textmedia element.
    // in that case cookie behaviour has to be implemented in custom component,
    // see T3CeTextmedia in playground for example
    ignoreCookies?:
        | boolean
        | ((contentElement: Typo3.Content.Element<any>) => boolean)
    // max width used for container specified by breakpoint name
    maxWidth?:
        | string
        | ((contentElement: Typo3.Content.Element<any>) => string | undefined)
    // determines container width based on variables.scss
    // default uses $container-widths
    // extended $screen-widths
    // full ignores container completely
    width?:
        | 'default'
        | 'full'
        | ((contentElement: Typo3.Content.Element<any>) => 'default' | 'full')
}
