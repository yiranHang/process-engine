<template>
  <ProcessForm :columns="formProps" :form-config="formConfig" :form-data="formData" @submit="formConfig.submit" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProcessForm from '@/components/ProcessForm/index.vue'
import { FormConfig, FormProps } from '@/components/ProcessForm/interface'
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
