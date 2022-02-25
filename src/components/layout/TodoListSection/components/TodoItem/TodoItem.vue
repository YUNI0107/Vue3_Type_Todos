<script setup lang="ts">
import { ref, inject, computed } from "vue"

// components
import Input from "@/components/commons/Input/Input.vue"

// types
import type { ITodoItem } from "@/types/others"

// utils
import getDate from "@/utils/getDate"

const props = defineProps<{
  item: ITodoItem
  index: number
}>()

// inject
const { reviseTodo, deleteTodo } = inject("todoList") as {
  reviseTodo: (reviseItem: ITodoItem, index: number) => void
  deleteTodo: (index: number) => void
}

// state
const isEditing = ref(false)

// computed
const date = computed(() => {
  return getDate(props.item.timeStamp)
})

// operation
const handleMode = (isStartEdit: boolean) => {
  isEditing.value = isStartEdit
}

const reviseTodoCheck = (item: ITodoItem) => {
  reviseTodo(item, props.index)
  handleMode(false)
}
</script>

<template>
  <div>
    <div v-if="!isEditing">
      <div class="date-block">
        <h2>{{ date.month }}.</h2>
        <p>{{ date.day }}</p>
      </div>

      <div>
        <div>
          <button @click="reviseTodoCheck({ ...item, isDone: !item.isDone })">
            {{ item.isDone ? "完成" : "未完成" }}
          </button>
          <p>{{ item.content }}</p>
        </div>

        <div>
          <button @click="handleMode(true)">編輯</button>
          <button @click="deleteTodo(props.index)">刪除</button>
        </div>
      </div>
    </div>

    <div v-else>
      <Input
        mode="reviseMode"
        placeholder="Edit the Todo"
        :initial-value="item.content"
        :initial-date-timestamp="item.timeStamp"
        @reviseTodo="reviseTodoCheck"
        @cancelEdit="handleMode(false)"
      />
    </div>
  </div>
</template>

<style scoped>
.date-block {
  background-color: var(--theme-red);
  width: 60px;
  height: 60px;
}
</style>
