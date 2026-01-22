<script setup lang="ts">
import Loader from './Loader.vue';

defineProps<{ msg: string }>()

</script>

<template>
  <Loader :duration="10" :text="'SCHRECKNET'"></Loader>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
