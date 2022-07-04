import { Base } from './base'
import { Form } from './solr'

export interface SolrSearch extends Base {
    data: {
        form: Form
    }
}
