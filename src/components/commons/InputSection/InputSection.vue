<script setup lang="ts">
import { ref } from "vue";
// icons
import { CircleCheckFilled, CircleCloseFilled } from "@element-plus/icons-vue";

// types
import type { ITodoItem, IInputMode } from "@/types/others";

const props = defineProps<{
  mode: IInputMode;
  placeholder: string;
  initialValue?: string;
  initialDateTimestamp?: number;
}>();

defineEmits<{
  reviseTodo: (item: ITodoItem) => void;
}>();

// refs
const inputValue = ref(props.initialValue);
const dateValue = ref(props.initialDateTimestamp);
</script>

<template>
  <div>
    <input type="text" v-model="inputValue" :placeholder="placeholder" />
    <button
      title="add-todo-button"
      @click="
        $emit('reviseTodo', {
          content: inputValue,
          timeStamp: dateValue,
        })
      "
    >
      <el-icon><circle-check-filled /></el-icon>
    </button>
    <button v-if="mode === 'reviseMode'">
      <el-icon><circle-close-filled /></el-icon>
    </button>
  </div>
</template>
