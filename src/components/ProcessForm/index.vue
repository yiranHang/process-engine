<template>
  <div v-if="columns.length" class="card table-search">
    <el-form ref="formRef" :model="formData" v-bind="formConfig" label-width="100px">
      <Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="formConfig?.formCol">
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
        <GridItem suffix>
          <div class="operation">
            <el-button type="primary" :icon="Search" @click="submit"> {{  }} </el-button>
            <el-button v-if="showCollapse" type="primary" link class="search-isOpen" @click="collapsed = !collapsed">
              {{ collapsed ? '展开' : '合并' }}
              <el-icon class="el-icon--right">
                <component :is="collapsed ? ArrowDown : ArrowUp"></component>
              </el-icon>
            </el-button>
          </div>
        </GridItem>
      </Grid>
    </el-form>
  </div>
</template>
<script setup lang="ts" name="ProcessForm">
import { computed, ref } from 'vue'
import { BreakPoint } from '@/components/Grid/interface'
import { Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import ProcessFormItem from './components/ProcessFormItem.vue'
import Grid from '@/components/Grid/index.vue'
import GridItem from '@/components/Grid/components/GridItem.vue'
import { FormConfig, FormProps } from './interface'

interface ProFormProps {
  columns?: FormProps[] // 表单配置列
  formData?: { [key: string]: any } // 表单数据
  formConfig?: FormConfig // 表单配置
  submit: (params: any) => void // 表单提交方法
}

// 默认值
const props = withDefaults(defineProps<ProFormProps>(), {
  columns: () => [],
  formData: () => ({}),
  formConfig: () => ({ formCol: 2 } as FormConfig),
})

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

// 是否默认折叠搜索项
const collapsed = ref(true)

// 获取响应式断点
const gridRef = ref()
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint)

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
  let show = false
  props.columns.reduce((prev, current) => {
    prev +=
      (current![breakPoint.value]?.span ?? current?.span ?? 1) +
      (current![breakPoint.value]?.offset ?? current?.offset ?? 0)
    if (typeof props.formConfig?.formCol !== 'number') {
      if (prev >= props.formConfig?.formCol[breakPoint.value]) show = true
    } else {
      if (prev >= props.formConfig?.formCol) show = true
    }
    return prev
  }, 0)
  return show
})
</script>
