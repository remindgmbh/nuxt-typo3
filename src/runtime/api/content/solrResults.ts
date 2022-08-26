import { SolrSearch } from './solrSearch'
import { Result } from './solr'

export type SolrResults = SolrSearch & {
    data: {
        results: Result
    }
}
