// TODO remove once issue is resolved and use default useAsyncData
// https://github.com/nuxt/framework/issues/2122#issuecomment-1131170846

import type {
    AsyncData,
    KeyOfRes,
    PickFrom,
    _Transform,
} from 'nuxt/dist/app/composables/asyncData'
import type { AsyncDataOptions, NuxtApp } from '#app'
import { useAsyncData, useState } from '#app'

export async function useAsyncDataWithError<
    DataT,
    DataE = Error,
    Transform extends _Transform<DataT> = _Transform<DataT, DataT>,
    PickKeys extends KeyOfRes<Transform> = KeyOfRes<Transform>
>(
    key: string,
    handler: (ctx?: NuxtApp) => Promise<DataT>,
    options: AsyncDataOptions<DataT, Transform, PickKeys> = {}
): Promise<
    AsyncData<PickFrom<ReturnType<Transform>, PickKeys>, DataE | null | true>
> {
    const serverError = useState<DataE | true | null>(
        `error-${key}`,
        () => null
    )
    const { error, data, ...rest } = await useAsyncData(key, handler, options)

    // Only set the value on server and if serverError is empty
    if (process.server && error.value && !serverError.value)
        serverError.value = error.value as DataE | true | null

    // Clear error if data is available
    if (data.value) serverError.value = null

    return {
        ...rest,
        data,
        error: serverError,
    }
}
