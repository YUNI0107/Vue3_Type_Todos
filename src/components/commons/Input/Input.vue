<script setup lang="ts">
import { ref, watch, inject, type Ref } from 'vue'

// types
import type { ITodoItem, IInputMode } from '@/types/others'

// icons
import { CircleCheckFilled, CircleCloseFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  mode: IInputMode
  placeholder: string
  initialValue?: string
  initialDateTimestamp?: number
  key?: string
}>()

const emit = defineEmits<{
  (e: 'reviseTodo', item: ITodoItem): void
  (e: 'cancelEdit'): void
}>()

// injects
const { addKeyCount, keyCount } = inject('todoList') as {
  addKeyCount: () => void
  keyCount: Ref<number>
}

// refs
const inputValue = ref(props.initialValue)
const dateValue = ref(props.initialDateTimestamp)
const isWarnShow = ref(false)

// operation
const disabledDate = (time: Date) => {
  const today = new Date()
  return time.getTime() < today.setDate(today.getDate() - 1)
}

const reviseTodoCheck = () => {
  if (inputValue.value && dateValue.value) {
    emit('reviseTodo', {
      key: props.key ? props.key : `key-${keyCount.value}`,
      content: inputValue.value,
      timeStamp: dateValue.value,
      isDone: false,
    })

    if (!props.key) addKeyCount()
    inputValue.value = ''
    dateValue.value = undefined
  } else {
    isWarnShow.value = true
  }
}

watch(
  [() => inputValue.value, () => dateValue.value],
  ([newInputValue, newDateValue]) => {
    if (newInputValue && newDateValue) {
      isWarnShow.value = false
    }
  }
)
</script>

<template>
  <div class="input-container">
    <div class="input-section">
      <div class="selection">
        <el-date-picker
          v-model="dateValue"
          type="date"
          placeholder="Pick a day"
          :disabled-date="disabledDate"
          format="YYYY/MM/DD"
          value-format="x"
          size="large"
          popper-class="date-picker"
        >
          <template #default="cell">
            <div
              class="cell"
              :class="{ current: cell.isCurrent, disabled: cell.disabled }"
            >
              <span class="text">{{ cell.text }}</span>
            </div>
          </template>
        </el-date-picker>
        <input
          class="text-input"
          type="text"
          v-model="inputValue"
          :placeholder="placeholder"
          :class="{ revise: mode === 'reviseMode' }"
          @keydown.enter="reviseTodoCheck"
        />
      </div>
      <p class="warn-text" v-if="isWarnShow">日期或代辦事項不得為空</p>
    </div>

    <div class="tools">
      <button class="button" @click="reviseTodoCheck">
        <el-icon :color="mode === 'reviseMode' ? '#2ecc71' : ''"
          ><circle-check-filled
        /></el-icon>
      </button>
      <button
        class="button"
        v-if="mode === 'reviseMode'"
        @click="$emit('cancelEdit')"
      >
        <el-icon :color="mode === 'reviseMode' ? '#e74c3c' : ''"
          ><circle-close-filled
        /></el-icon>
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
}
.input-section {
  flex: 1;
}
.selection {
  display: flex;
}
.text-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px 20px;
}
.text-input.revise {
  background: black;
  color: #fff;
  margin-left: 12px;
  border-radius: 5px;
  flex: 1;
}

.text-input.revise:focus {
  border: solid 1px #eee;
}
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}
.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.cell.current .text {
  background: var(--theme-red);
  color: #fff;
}
.cell.disabled .text {
  cursor: not-allowed;
  color: #fff;
  background-color: #eee;
}

.warn-text {
  color: var(--theme-red);
  font-size: 12px;
  padding-top: 10px;
}

.tools {
  display: flex;
}
</style>
