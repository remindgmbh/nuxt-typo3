import type { AppConfigInput } from '.'

export interface AppConfigDefaults {
    breadcrumbs: NonNullable<AppConfigInput['breadcrumbs']>
    contentElements: NonNullable<AppConfigInput['contentElements']>
    form: NonNullable<AppConfigInput['form']>
    i18n: NonNullable<AppConfigInput['i18n']>
    imageFileExtension: NonNullable<AppConfigInput['imageFileExtension']>
    languages: NonNullable<AppConfigInput['languages']>
    spacing: NonNullable<AppConfigInput['spacing']>
    theme: NonNullable<AppConfigInput['theme']>
}
