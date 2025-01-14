# 流程引擎表单

## 组件说明

`ProcessForm` 是一个动态表单组件，可以根据传入的配置生成表单，并处理表单提交。

## 使用方法

### 引入组件

首先，在你的 Vue 组件中引入 `ProcessForm` 组件：

```vue
<template>
  <ProcessForm :columns="formProps" :form-config="formConfig" :form-data="formData" @submit="formConfig.submit" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProcessForm from '@/components/ProcessForm/index.vue'
import { FormConfig, FormProps } from '@/types'
import { convertArrowFunctionStrings } from '@/utils'

const aa = JSON.stringify([
  {
    el: 'input',
    label: '姓名',
    key: 'name'
  },
  {
    el: 'input',
    label: '年龄',
    key: 'age',
    props: {
      onChange: `(params) => {console.log(params)}`
    }
  },
  {
    el: 'select',
    label: '性别',
    key: 'gender',
    props: {
      async: `async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { value: 'male', label: '男' },
              { value: 'female', label: '女' }
            ])
          }, 1000)
        })
      }`
    }
  }
])

const formProps = convertArrowFunctionStrings(JSON.parse(aa)) as unknown as FormProps[]
const formData = ref({
  name: '张三',
  age: 18
})

const bb = {
  formCol: 2,
  submitText: '提交',
  title: '测试表单',
  submit: `(params) => {console.log(params)}`
}

const formConfig = convertArrowFunctionStrings(bb) as unknown as FormConfig
</script>

<style scoped></style>

```

### 属性说明
### 属性说明

#### columns
| 属性           | 类型                                               | 说明                                                                          |
| -------------- | -------------------------------------------------- | ----------------------------------------------------------------------------- |
| `el`           | `FormType`                                         | 表单元素类型，如 `input`、`select`等。                                        |
| `key`          | `string`                                           | 表单字段的唯一标识。                                                          |
| `fieldNames`   | `FieldNamesProps`                                  | 字段名称配置。                                                                |
| `label`        | `string`                                           | 表单字段标签。                                                                |
| `props`        | `any`                                              | 透传element-plus表单的元素，新增异步选项加载函数(async)用于select数据加载等。 |
| `tooltip`      | `string`                                           | 字段提示信息。                                                                |
| `order`        | `number`                                           | 字段顺序。                                                                    |
| `span`         | `number`                                           | 字段所占列数。                                                                |
| `offset`       | `number`                                           | 字段偏移列数。                                                                |
| `defaultValue` | `string \| number \| boolean \| any[] \| Ref<any>` | 字段默认值。                                                                  |
| `render`       | `(scope: FormRenderScope) => VNode`                | 自定义渲染函数。                                                              |


#### form-config(继承了element-ui的form-props)
| 属性         | 类型                                   | 说明               |
| ------------ | -------------------------------------- | ------------------ |
| `formCol`    | `number \| Record<BreakPoint, number>` | 表单列数配置。     |
| `title`      | `string`                               | 表单标题。         |
| `submitText` | `string`                               | 提交按钮文本。     |
| `submit`     | `(params: any) => void`                | 表单提交处理函数。 |



#### FormType
| 类型           | 说明       |
| -------------- | ---------- |
| `input`        | 输入框     |
| `input-number` | 数字输入框 |
| `select`       | 下拉选择框 |
| `tree-select`  | 树形选择框 |
| `cascader`     | 级联选择框 |
| `date-picker`  | 日期选择器 |
| `time-picker`  | 时间选择器 |
| `time-select`  | 时间选择框 |
| `switch`       | 开关       |
| `slider`       | 滑动条     |

### FieldNamesProps 类型说明
| 属性       | 类型     | 说明               |
| ---------- | -------- | ------------------ |
| `label`    | `string` | 字段标签名称       |
| `value`    | `string` | 字段值名称         |
| `children` | `string` | 子字段名称（可选） |


### BreakPoint 类型说明
| 类型  | 说明 |
| `xs`  | 超小屏幕设备 |
| `sm`  | 小屏幕设备 |
| `md`  | 中等屏幕设备 |
| `lg`  | 大屏幕设备 |
| `xl`  | 超大屏幕设备 |


### 事件说明
@submit：表单提交事件，当表单提交时触发，传递表单数据作为参数。
