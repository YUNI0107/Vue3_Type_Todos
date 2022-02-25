<script setup lang="ts">
import { provide, ref } from "vue"

// components
import AddTodoSection from "@/components/layout/AddTodoSection/AddTodoSection.vue"
import TodoListSection from "./components/layout/TodoListSection/TodoListSection.vue"

// types
import type { ITodoItem } from "@/types/others"

// data
import { todoDefaultList } from "@/data/todoDefaultList"

const todoList = ref(todoDefaultList)

// operation
const addTodo = (newItem: ITodoItem) => {
  todoList.value.push(newItem)
}

const reviseTodo = (reviseItem: ITodoItem, index: number) => {
  todoList.value.splice(index, 1, reviseItem)
}

const deleteTodo = (index: number) => {
  todoList.value.splice(index, 1)
}

provide("todoList", {
  todoList: todoList.value,
  addTodo,
  reviseTodo,
  deleteTodo,
})
</script>

<template>
  <el-container>
    <div>
      <el-row class="title-group">
        <h1 class="title">TODO LIST</h1>
        <p>Vue3 + TypeScript</p>
      </el-row>
      <AddTodoSection />
    </div>

    <TodoListSection />
  </el-container>
</template>

<style>
@import "./assets/base.css";
@import url("https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Poppins:wght@300;800&display=swap");

.el-container {
  background-color: var(--theme-dark-black);
  min-height: 100vh;
  width: 100vw;
  padding: 80px 50px;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
}

.title {
  font-size: 36px;
  font-weight: 800;
  padding-right: 20px;
}

.title-group {
  align-items: baseline;
}
</style>
