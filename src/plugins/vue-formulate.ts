export default function (formulateInstance) {
    formulateInstance.extend({
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
}
