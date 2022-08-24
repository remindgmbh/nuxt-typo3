import { Api } from '#nuxt-typo3'

export function useCeNewsPi1() {
    const isDetail = (
        news: Api.ContentElement<Api.Content.NewsPi>
    ): news is Api.ContentElement<Api.Content.NewsPiDetails> =>
        news.content.data.settings.action === 'detail'

    const isList = (
        news: Api.ContentElement<Api.Content.NewsPi>
    ): news is Api.ContentElement<Api.Content.NewsPiList> =>
        news.content.data.settings.action === 'list'

    const isTagsList = (
        news: Api.ContentElement<Api.Content.NewsPi>
    ): news is Api.ContentElement<Api.Content.NewsPiTagsList> =>
        news.content.data.settings.action === 'tagsList'

    const isDateMenu = (
        news: Api.ContentElement<Api.Content.NewsPi>
    ): news is Api.ContentElement<Api.Content.NewsPiDateMenu> =>
        news.content.data.settings.action === 'dateMenu'

    return {
        isDetail,
        isList,
        isTagsList,
        isDateMenu,
    }
}
