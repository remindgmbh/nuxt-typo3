<template>
    <div class="ce-form">
        <FormulateForm
            v-slot="{ isLoading }"
            :name="form.id"
            :values="initialValues"
            @submit="submit"
        >
            <FormulateInput
                v-for="formInput in formInputs"
                :key="formInput.identifier"
                :disabled="isLoading"
                v-bind="formInput"
            />
            <FormulateInput type="submit" :disabled="isLoading">
                <template v-if="isLoading">
                    {{ form.i18n.loading }}
                </template>
                <template v-else>
                    {{ form.i18n.submit }}
                </template>
            </FormulateInput>
        </FormulateForm>
    </div>
</template>
<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import baseCe from 'nuxt-typo3/lib/templates/components/content/mixins/baseCe'
import { Form, FormElement } from '../../../api/form'
import { Typolink } from '../../../api/typolink'

// Map TYPO3 Input types to vueformulate
const TYPES = {
    Text: 'text',
    Textarea: 'textarea',
    Password: 'password',
    Email: 'email',
    Telephone: 'tel',
    Url: 'url',
    Number: 'number',
    Date: 'date',
    SingleSelect: 'select',
    FileUpload: 'file',
    Checkbox: 'checkbox',
    RadioButton: 'radio',
}

// Map TYPO3 validation rules to vueformulate
const VALIDATIONS = {
    EmailAddress: 'email',
    NotEmpty: 'required',
    Number: 'number',
}

@Component({
    name: 'CeFormFormframework',
})
export default class CeFormFormframework extends mixins(baseCe) {
    @Prop({ type: String, required: true })
    bodytext!: string

    @Prop({ type: Object, required: true })
    form!: Form

    @Prop({ type: Object, required: true })
    link!: Typolink

    get initialValues(): { [key: string]: any } {
        return this.form.elements.reduce((result, value) => {
            result[this.getFormElementName(value)] = value.defaultValue || null
            return result
        }, {})
    }

    get formInputs(): {
        id: string
        name: string
        type: any
        label: string
        placeholder: any
        options: any
        validation: string[]
    }[] {
        return this.form.elements.map((formElement) => ({
            id: formElement.identifier,
            name: this.getFormElementName(formElement),
            type: TYPES[formElement.type] || 'hidden',
            label: formElement.label,
            placeholder:
                formElement.properties?.fluidAdditionalAttributes?.placeholder,
            options: formElement.properties.options,
            validation: (formElement.validators || []).map(
                (validator) => VALIDATIONS[validator.identifier]
            ),
        }))
    }

    getFormElementName(formElement: FormElement): string {
        return `tx_form_formframework[${this.form.id}][${formElement.identifier}]`
    }

    submit(data: { [key: string]: any }): Promise<void> {
        const formData = Object.keys(data).reduce((result, key) => {
            result.set(key, data[key] || '')
            return result
        }, new FormData())

        this.$axios.setBaseURL(this.$typo3.options.api.baseURL)

        return this.$axios.post(this.link.url, formData).then(() => {
            this.$formulate.reset(this.form.id, this.initialValues)
        })
    }
}
</script>
