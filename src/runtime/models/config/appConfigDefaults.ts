import { AppConfigInput } from '.'

export interface AppConfigDefaults {
    contentElements: NonNullable<AppConfigInput['contentElements']>
    defaultTheme: NonNullable<AppConfigInput['defaultTheme']>
    i18n: NonNullable<AppConfigInput['i18n']>
    imageFileExtension: NonNullable<AppConfigInput['imageFileExtension']>
    languages: NonNullable<AppConfigInput['languages']>
    layout: NonNullable<AppConfigInput['layout']>
    spacing: NonNullable<AppConfigInput['spacing']>
    themes: NonNullable<AppConfigInput['themes']>
}
