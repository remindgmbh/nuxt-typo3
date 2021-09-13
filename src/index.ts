import './types/vue-formulate.d'

import './plugins/context'

export * from './api/breadcrumb'
export * from './api/form'
export * from './api/image'
export * from './api/navigation'
export * from './api/structure'
export * from './api/typolink'

export { default } from './module'

module.exports.meta = require('../package.json')
