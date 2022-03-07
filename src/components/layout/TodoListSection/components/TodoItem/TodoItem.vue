<script setup lang="ts">
import { ref, inject, computed } from 'vue'

// components
import Input from '@/components/commons/Input/Input.vue'

// types
import type { ITodoItem } from '@/types/others'

// utils
import getDate from '@/utils/getDate'

// icon
import { Edit, DeleteFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  item: ITodoItem
}>()

// inject
const { reviseTodo, deleteTodo } = inject('todoList') as {
  reviseTodo: (reviseItem: ITodoItem, index: string) => void
  deleteTodo: (key: string) => void
}
const { openDialogCheck } = inject('dialog') as {
  openDialogCheck: (callback: Function) => void
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
  reviseTodo(item, props.item.key)
  handleMode(false)
}

const deleteTodoCheck = (key: string) => {
  openDialogCheck(() => deleteTodo(key))
}
</script>

<template>
  <div class="todo-item" :class="item.isDone && 'done'">
    <div v-if="!isEditing" class="show-item">
      <div class="date-block">
        <div>
          <p>{{ date.month }}.</p>
          <h2>{{ date.day }}</h2>
        </div>
        <p class="week">{{ date.week }}</p>
      </div>
      <div class="content-block">
        <div class="content-info">
          <button @click="reviseTodoCheck({ ...item, isDone: !item.isDone })">
            <div class="ball" :class="{ done: item.isDone }"></div>
          </button>
          <p>{{ item.content }}</p>
        </div>

        <div class="content-tool">
          <button class="button" @click="handleMode(true)" v-if="!item.isDone">
            <el-icon color="#fff"><edit /></el-icon>
          </button>
          <button class="button" @click="deleteTodoCheck(props.item.key)">
            <el-icon color="#fff"><delete-filled /></el-icon>
          </button>
        </div>
      </div>
    </div>

    <div class="input-block" v-else>
      <Input
        mode="reviseMode"
        placeholder="Edit the Todo"
        :initial-value="item.content"
        :initial-date-timestamp="item.timeStamp"
        :key="item.key"
        @reviseTodo="reviseTodoCheck"
        @cancelEdit="handleMode(false)"
      />
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  width: 100%;
  border: solid 1px #fff;
  margin: 16px 0;
}
.todo-item.done {
  opacity: 0.25;
}

.show-item {
  display: flex;
  width: 100%;
}

.date-block {
  background-color: var(--theme-red);
  width: 60px;
  min-width: 60px;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.date-block h2 {
  font-weight: 800;
  font-size: 24px;
  display: inline-block;
  line-height: 28px;
}

.date-block p {
  display: inline-block;
  line-height: 18px;
}
.date-block .week {
  font-size: 12px;
  line-height: 16px;
}

.content-block {
  flex: 1;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content-block .content-info {
  display: flex;
  align-items: center;
}

.content-block .content-info p {
  margin-left: 20px;
}

.content-block .content-info button {
  background: none;
  outline: none;
  border: none;
}
.content-block .content-info .ball {
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: black;
  border: solid 1px #fff;
  cursor: pointer;
}

.content-block .content-info .ball.done::before {
  content: '';
  width: 20px;
  height: 20px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.content-tool {
  display: flex;
}

.input-block {
  padding: 10px 12px;
}
</style>
