<template>
  <div class="container p-4 rounded-lg d-flex gap-2 w-50">
    <input type="text" placeholder="Super Mario Bros, Avatar" class="form-control" v-model="inputValue" autofocus />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'


const emits = defineEmits(['input-value'])

const inputValue = ref('')

watch(inputValue, () => {
  emits('input-value', inputValue.value)
})
</script>

<style scoped></style>
