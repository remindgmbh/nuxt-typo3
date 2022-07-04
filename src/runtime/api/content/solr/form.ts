export interface Form {
    targetUrl: string
    pluginNamespace: string
    queryParams: {
        q: string
        page: string
    }
    suggest: {
        url: string
        queryParam: string
    }
}
