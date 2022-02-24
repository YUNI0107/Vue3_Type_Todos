<script setup lang="ts">
import { ref } from "vue";

// components
import InputSection from "@/components/common/InputSection/InputSection.vue";

// types
import type { ITodoItem } from "@/types/others";

// operation
const addTodo = (item: ITodoItem) => {
  console.log(item);
};
</script>

<template>
  <InputSection
    mode="addMode"
    @reviseTodo="addTodo"
    placeholder="Add New Todo"
  />
</template>
