<template>
  <div class="index"> {{ name }} </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  const name = ref('Ding')
</script>
<style scoped>
  .index {
    text-align: center;
    padding-top: 100px;
    font-size: 28px;
  }
</style>
