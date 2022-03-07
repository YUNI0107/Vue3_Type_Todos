<script setup lang="ts">
import { provide, ref, computed } from "vue"

// components
import AddTodoSection from "@/components/layout/AddTodoSection/AddTodoSection.vue"
import TodoListSection from "./components/layout/TodoListSection/TodoListSection.vue"
import Dialog from "./components/commons/Dialog/Dialog.vue"

// types
import type { ITodoItem } from "@/types/others"

// data
import { todoDefaultList } from "@/data/todoDefaultList"

// icon
import { CaretTop } from "@element-plus/icons-vue"

// state
const todoList = ref(todoDefaultList)
const keyCount = ref(1)
const isDesc = ref(true)
const dialogVisible = ref(false)
const dialogCallback = ref()

// computed
const todoDateList = computed(() => {
  const undoneList = todoList.value.filter((item) => {
    return item.isDone === false
  })

  const sortedUndoneList = undoneList.sort((a, b) => {
    return isDesc.value ? a.timeStamp - b.timeStamp : b.timeStamp - a.timeStamp
  })

  const doneList = todoList.value.filter((item) => {
    return item.isDone
  })

  return [...sortedUndoneList, ...doneList]
})

// operation
const addTodo = (newItem: ITodoItem) => {
  todoList.value.push(newItem)
}

const reviseTodo = (reviseItem: ITodoItem, key: string) => {
  const index = todoList.value.findIndex((item) => item.key === key)
  todoList.value.splice(index, 1, reviseItem)
}

const deleteTodo = (key: string) => {
  const index = todoList.value.findIndex((item) => item.key === key)
  todoList.value.splice(index, 1)
}

const addKeyCount = () => {
  keyCount.value++
}

const handleDialog = (isShow: boolean) => {
  dialogVisible.value = isShow
}

const openDialogCheck = (callback: Function) => {
  handleDialog(true)
  dialogCallback.value = callback
}

provide("todoList", {
  todoList: todoDateList,
  keyCount,
  addTodo,
  reviseTodo,
  deleteTodo,
  addKeyCount,
})

provide("dialog", {
  dialogVisible,
  openDialogCheck,
  handleDialog,
})
</script>

<template>
  <Dialog @confirmCallback="dialogCallback" />
  <el-container>
    <div>
      <el-row class="title-group">
        <h1 class="title">TODO LIST</h1>
        <p>Vue3 + TypeScript</p>
      </el-row>
      <AddTodoSection />
    </div>

    <div class="todo-section">
      <div class="sort-section" @click="isDesc = !isDesc">
        <p>Sort By Date</p>
        <el-icon color="#fff" :class="{ desc: isDesc }"><caret-top /></el-icon>
      </div>

      <h1 v-if="todoList.length === 0">無代辦事項</h1>
      <TodoListSection v-else />
    </div>
  </el-container>
</template>

<style>
@import "./assets/base.css";

.el-container {
  background-color: var(--theme-dark-black);
  min-height: 100vh;
  width: 100vw;
  padding: 80px 50px;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  flex-direction: column;
}

.title {
  font-size: 36px;
  font-weight: 800;
  padding-right: 20px;
}

.title-group {
  align-items: baseline;
}

.todo-section {
  padding: 20px 0;
}

.sort-section {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
}

.sort-section p {
  margin-right: 4px;
  font-size: 12px;
}

.desc {
  transform: rotate(180deg);
}
</style>
