import Vue from 'vue'

// Base backend layout mixin
export default Vue.extend({
    props: {
        /**
         * page contentData
         */
        content: {
            type: [Object, Array],
            required: true,
            default: (): unknown => ({}),
        },
    },
})
