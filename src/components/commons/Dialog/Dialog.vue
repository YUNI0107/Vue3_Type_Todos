<script setup lang="ts">
import { inject, type Ref } from 'vue'

const emit = defineEmits<{
  (e: 'confirmCallback'): void
}>()

const { dialogVisible, handleDialog } = inject('dialog') as {
  dialogVisible: Ref<boolean>
  handleDialog: (isShow: boolean) => void
}

const confirmClick = () => {
  emit('confirmCallback')
  handleDialog(false)
}
</script>

<template>
  <div>
    <el-dialog v-model="dialogVisible" title="刪除" width="30%">
      <span>是否刪除這則待辦事項？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button class="confirm" @click="confirmClick">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.confirm {
  color: #fff;
  background: #fc4e24;
}
</style>
