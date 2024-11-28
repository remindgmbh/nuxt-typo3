import type { AppConfigInput } from './index'

type RequiredAppConfig = Required<
    Pick<
        AppConfigInput,
        | 'api'
        | 'breadcrumbs'
        | 'contentElements'
        | 'form'
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
    form: {
        hideLabel: Required<RequiredAppConfig['form']>['hideLabel']
        reverseOrder: Required<RequiredAppConfig['form']>['reverseOrder']
        wrapper: {
            fieldset: Required<RequiredAppConfig['form']>['wrapper']['fieldset']
            label: Required<RequiredAppConfig['form']>['wrapper']['label']
        }
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
