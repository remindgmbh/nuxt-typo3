<template>
    <div class="t3-file-upload">
        <slot name="beforeLabel"></slot>
        <label
            v-if="$slots.label"
            class="t3-file-upload__label"
            :for="name"
            @dragover.prevent
            @drop.prevent="onDrop"
        >
            <slot name="label"></slot>
        </label>
        <slot name="afterLabel"></slot>
        <input
            :id="name"
            ref="inputEl"
            :accept="accept"
            class="t3-file-upload__input"
            :disabled="disabled"
            :multiple="multiple"
            :name="name"
            :placeholder="placeholder"
            :required="required"
            type="file"
            @blur="handleBlur"
            @change="onChange"
        />
        <slot :files="files" name="beforeFiles"></slot>
        <ul v-if="$slots.file" class="t3-file-upload__files">
            <li
                v-for="(file, index) in files"
                :key="index + file.name"
                class="t3-file-upload__file"
            >
                <slot
                    :file="file"
                    name="file"
                    :remove="() => remove(index)"
                ></slot>
            </li>
        </ul>
        <slot :files="files" name="afterFiles"></slot>
    </div>
</template>

<script setup lang="ts">
import { type RuleExpression, useField } from 'vee-validate'
import { computed, ref } from 'vue'

export interface Props {
    disabled?: boolean
    mimeTypes?: string[]
    multiple?: boolean
    name: string
    placeholder?: string
    required?: boolean
    validation?: RuleExpression<any>
}

const props = defineProps<Props>()

const accept = computed(() => props.mimeTypes?.join(','))

const inputEl = ref<HTMLInputElement>()

const { handleBlur, handleChange, value, setValue } = useField<
    File | File[] | undefined
>(() => props.name, props.validation)

const files = computed(() =>
    !value.value
        ? []
        : Array.isArray(value.value)
          ? value.value
          : [value.value],
)

function onChange(e: Event) {
    if (e.target instanceof HTMLInputElement) {
        if (props.multiple && files.value) {
            const newFiles: File[] = [...files.value]

            if (e.target.files) {
                for (let i = 0; i < e.target.files.length; i++) {
                    newFiles.push(e.target.files[i])
                }
            }

            const dataTransfer = new DataTransfer()

            newFiles.forEach((file) => {
                dataTransfer.items.add(file)
            })

            e.target.files = dataTransfer.files
        }

        handleChange(e)
    }
}

function onDrop(e: DragEvent) {
    const fileList = e.dataTransfer?.files
    if (fileList) {
        const newFiles: File[] = []

        if (props.multiple) {
            newFiles.push(...files.value)
        }

        for (
            let index = 0;
            index < (props.multiple ? fileList.length : 1);
            index++
        ) {
            const file = fileList.item(index)
            if (file) {
                newFiles.push(file)
            }
        }
        updateFiles(newFiles)
    }
}

function remove(index: number) {
    updateFiles(
        props.multiple
            ? files.value.filter((_file, i) => i !== index)
            : undefined,
    )
}

function updateFiles(newValue: File[] | undefined) {
    if (inputEl.value) {
        const newFiles = newValue
            ? Array.isArray(newValue)
                ? newValue
                : [newValue]
            : undefined

        const dataTransfer = new DataTransfer()

        if (newFiles) {
            newFiles.forEach((file) => {
                dataTransfer.items.add(file)
            })
        }

        inputEl.value.files = dataTransfer.files

        setValue(!props.multiple ? newValue?.at(0) : newValue)
    }
}
</script>
