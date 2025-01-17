<template>
  <component
    :is="column?.render ?? `el-${column?.el}`"
    v-bind="{ ...handleFormProps, ...placeholder, formParam: _formParam, clearable }"
    v-model.trim="_formParam[column!.key]"
    :data="column?.el === 'tree-select' ? columnEnum : []"
    :options="['cascader'].includes(column?.el!) ? columnEnum : []"
  >
    <template v-if="column?.el === 'cascader'" #default="{ data }">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column?.el === 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      ></component>
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts" name="ProcessFormItem">
import { computed, inject, onMounted, ref } from 'vue'
import { FormProps } from '@/types'

interface FormItem {
  column: FormProps
  formParam: { [key: string]: any }
}
const props = defineProps<FormItem>()
// Re receive SearchParam
const _formParam = computed(() => props.formParam)

// 判断 fieldNames 设置 label && value && children 的 key 值
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? 'label',
    value: props.column.fieldNames?.value ?? 'value',
    children: props.column.fieldNames?.children ?? 'children'
  }
})

// 接收 enumMap (el 为 select-v2 需单独处理 enumData)
const enumMap = inject('enumMap', ref(new Map()))
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.column.key)
  if (!enumData && !props.column.props?.options && !props.column.props?.async) return []
  if (props.column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return { ...item, label: item[fieldNames.value.label], value: item[fieldNames.value.value] }
    })
  }
  return enumData ?? props.column.props?.options
})
// 处理透传的 formProps (el 为 tree-select、cascader 的时候需要给下默认 label && value && children)
const handleFormProps = computed(() => {
  const label = fieldNames.value.label
  const value = fieldNames.value.value
  const children = fieldNames.value.children
  const formEl = props.column?.el
  let formProps = props.column?.props ?? {}
  if (formEl === 'tree-select') {
    formProps = { ...formProps, props: { ...formProps.props, label, children }, nodeKey: value }
  }
  if (formEl === 'cascader') {
    formProps = { ...formProps, props: { ...formProps.props, label, value, children } }
  }
  return formProps
})

// 处理默认 placeholder
const placeholder = computed(() => {
  const search = props.column
  if (['datetimerange', 'daterange', 'monthrange'].includes(search?.props?.type) || search?.props?.isRange) {
    return { rangeSeparator: '至', startPlaceholder: '开始时间', endPlaceholder: '结束时间' }
  }
  const placeholder = search?.props?.placeholder ?? (search?.el?.includes('input') ? '请输入' : '请选择')
  return { placeholder }
})

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
  const search = props.column
  return search?.props?.clearable ?? (search?.defaultValue == null || search?.defaultValue == undefined)
})

const loadOptions = async (column: FormProps) => {
  if (column.props && column.props.async) {
    try {
      enumMap.value.set(column.key, await column.props.async())
    } catch (error) {
      console.error(`Error loading options for column: ${column.key}`, error)
    }
  }
}

onMounted(() => {
  if (props.column.el === 'select') {
    loadOptions(props.column)
  }
})
</script>
