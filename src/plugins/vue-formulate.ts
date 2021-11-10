import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate, {
    library: {
        suggest: {
            classification: 'text',
            component: 'FormulateInputSuggest',
            slotProps: {
                component: ['list', 'top'],
            },
        },
    },
})
