<script setup lang="ts">
import { inject } from "vue"

// components
import InputSection from "@/components/commons/Input/Input.vue"

// types
import type { ITodoItem } from "@/types/others"

// state
const { addTodo } = inject("todoList") as {
  addTodo: (newItem: ITodoItem) => void
}
</script>

<template>
  <el-row>
    <el-col :span="24" class="add-section">
      <InputSection
        mode="addMode"
        @reviseTodo="addTodo"
        placeholder="Add New Todo"
      />
    </el-col>
  </el-row>
</template>

<style scoped>
.add-section {
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
}
</style>
