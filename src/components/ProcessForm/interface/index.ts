import { VNode, Ref } from 'vue'
import { BreakPoint, Responsive } from '@/components/Grid/interface'
import type { FormInstance } from 'element-plus'

export interface EnumProps {
  label?: string // 选项框显示的文字
  value?: string | number | boolean | any[] // 选项框值
  disabled?: boolean // 是否禁用此选项
  tagType?: string // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

export interface FormConfig extends FormInstance {
  formCol: number | Record<BreakPoint, number>
  title?: string
  submitText?: string
  submit: (params: any) => void
}

export type TypeProps = 'index' | 'selection' | 'radio' | 'expand' | 'sort'

export type FormType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'switch'
  | 'slider'

export type FormRenderScope = {
  formParam: { [key: string]: any }
  placeholder: string
  clearable: boolean
  options: EnumProps[]
  data: EnumProps[]
}

export type FormProps = {
  el: FormType // 当前项搜索框的类型
  key: string // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  fieldNames?: FieldNamesProps // 指定 label && value && children 的 key 值
  label?: string // 当前项搜索框的 label
  props?: any // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  tooltip?: string // 搜索提示
  order?: number // 搜索项排序（从大到小）
  span?: number // 搜索项所占用的列数，默认为1列
  offset?: number // 搜索字段左侧偏移列数
  defaultValue?: string | number | boolean | any[] | Ref<any> // 搜索项默认值
  render?: (scope: FormRenderScope) => VNode // 自定义搜索内容渲染（tsx语法）
} & Partial<Record<BreakPoint, Responsive>>

export type FieldNamesProps = {
  label: string
  value: string
  children?: string
}
