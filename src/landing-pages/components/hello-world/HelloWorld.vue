<script setup lang="ts">
import { Btn } from "@impactinc/ui-component-library";
import Typography from "@/shared/components/typography/Typography.vue";
defineProps<{ message: string; error?: string | undefined }>();
</script>

<template>
  <div class="your-project-component">
    <Typography v-show="message" variant="h1">Some changed text that was prev Hello World</Typography>
    <p v-show="error" class="error">
      {{ error }}
    </p>
    <Btn class="primary" @click="$emit('btn-click')">Click me</Btn>
  </div>
</template>

<style>
.error {
  color: red;
}
</style>
