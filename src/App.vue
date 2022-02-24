<script setup lang="ts">
import { provide, ref } from "vue";

// components
import AddTodoSection from "@/components/layout/AddTodoSection/AddTodoSection.vue";

// types
import type { ITodoItem } from "@/types/others";

// data
import { todoDefaultList } from "@/data/todoDefaultList";

const todoList = ref(todoDefaultList);
const addTodo = (newItem: ITodoItem) => {
  todoList.value.push(newItem);
};

provide("todoList", {
  todoDefaultList,
  addTodo,
});
</script>

<template>
  <el-header>
    <h1>TODO LIST</h1>
    <p>Vue3 + TypeScript</p>
    <AddTodoSection />
  </el-header>

  <el-main> </el-main>
</template>

<style>
@import "./assets/base.css";
</style>
