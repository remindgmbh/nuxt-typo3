import type { AppConfigInput } from './index'

type RequiredAppConfig = Required<
    Pick<
        AppConfigInput,
        | 'api'
        | 'breadcrumbs'
        | 'contentElements'
        | 'i18n'
        | 'imageFileExtension'
        | 'languages'
        | 'spacing'
        | 'theme'
    >
> &
    AppConfigInput

export type AppConfig = RequiredAppConfig & {
    api: {
        initialDataType: Required<RequiredAppConfig['api']>['initialDataType']
    }
    breadcrumbs: {
        fullWidth: Required<RequiredAppConfig['breadcrumbs']>['fullWidth']
    }
    i18n: {
        locale: Required<RequiredAppConfig['i18n']>['locale']
        messages: Required<RequiredAppConfig['i18n']>['messages']
    }
    theme: {
        backgroundColors: Required<
            RequiredAppConfig['theme']
        >['backgroundColors']
        default: Required<RequiredAppConfig['theme']>['default']
    }
}
