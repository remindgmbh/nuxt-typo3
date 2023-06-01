import { Typo3 } from '..'
import { GalleryOptions, ImageOptions } from '.'

export interface CeOptions {
    // if set to true, content element is shown even if cookie should block it
    // required if not the whole content element should be blocked by cookie,
    // but only one part, for example a video in a textmedia element.
    // in that case cookie behaviour has to be implemented in custom component,
    // see T3CeTextmedia in playground for example
    ignoreCookies?:
        | boolean
        | ((contentElement: Typo3.Content.Element) => boolean)
    images?: ImageOptions
    gallery?: GalleryOptions
    // max width used for container specified by breakpoint name
    maxWidth?: string | ((contentElement: Typo3.Content.Element) => string)
    // enable or disable padding left and right for content element
    padding?: boolean | ((contentElement: Typo3.Content.Element) => boolean)
    // default uses container-width for container
    // large uses screen-width instead of container-width for container
    // full ignores container completely
    width?:
        | 'default'
        | 'large'
        | 'full'
        | ((
              contentElement: Typo3.Content.Element
          ) => 'default' | 'large' | 'full')
}
