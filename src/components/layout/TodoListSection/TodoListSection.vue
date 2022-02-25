<script setup lang="ts">
import { inject } from "vue"

// components
import TodoItem from "./components/TodoItem/TodoItem.vue"

// types
import type { ITodoItem } from "@/types/others"

const { todoList } = inject("todoList") as {
  todoList: Array<ITodoItem>
}

console.log(todoList)
</script>

<template>
  <div v-for="(todoItem, index) in todoList">
    <TodoItem :item="todoItem" :index="index" :key="index" />
  </div>
</template>
