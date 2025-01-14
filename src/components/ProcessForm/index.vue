<template>
  <div v-if="columns.length" class="card table-search">
    <div class="form-header" v-if="formConfig.title">
      <div class="form-title">
        {{ formConfig.title }}
      </div>
      <div class="form-actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <el-form ref="formRef" :model="formData" v-bind="formConfig" label-width="100px">
      <Grid ref="gridRef" :gap="[20, 0]" :cols="formConfig?.formCol">
        <GridItem v-for="(item, index) in columns" :key="item.key" v-bind="getResponsive(item)" :index="index">
          <el-form-item>
            <template #label>
              <el-space :size="4">
                <span>{{ `${item?.label ?? item.label}` }}</span>
                <el-tooltip v-if="item?.tooltip" effect="dark" :content="item.tooltip" placement="top">
                  <i :class="'iconfont icon-yiwen'"></i>
                </el-tooltip>
              </el-space>
              <span>:</span>
            </template>
            <ProcessFormItem :column="item" :form-param="formData" />
          </el-form-item>
        </GridItem>
      </Grid>
    </el-form>
    <div class="operation">
      <el-button type="primary" @click="submit"> {{ formConfig.submitText }} </el-button>
    </div>
  </div>
</template>
<script setup lang="ts" name="ProcessForm">
import { computed } from 'vue'
import ProcessFormItem from '@/components/ProcessForm/components/ProcessFormItem.vue'
import Grid from '@/components/Grid/index.vue'
import GridItem from '@/components/Grid/components/GridItem.vue'
import { FormConfig, FormProps } from '@/types'

interface ProFormProps {
  columns?: FormProps[] // 表单配置列
  formData?: { [key: string]: any } // 表单数据
  formConfig?: FormConfig // 表单配置
}

const emits = defineEmits(['submit'])

// 默认值
const props = withDefaults(defineProps<ProFormProps>(), {
  columns: () => [],
  formData: () => ({}),
  formConfig: () => ({ formCol: 2 }) as FormConfig
})

const columns = computed(() => props.columns)
const formData = computed(() => props.formData)
const formConfig = computed(() => props.formConfig)

// 获取响应式设置
const getResponsive = (item: FormProps) => {
  return {
    span: item.span,
    offset: item.offset ?? 0,
    xs: item.xs,
    sm: item.sm,
    md: item.md,
    lg: item.lg,
    xl: item.xl
  }
}

const submit = () => {
  emits('submit', formData.value)
}
</script>

<style lang="scss" scoped>
.operation {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 18px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
