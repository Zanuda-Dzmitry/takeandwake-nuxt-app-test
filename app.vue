<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Импорт хранилища аутентификации
const identificationsStore = useIdentificationsUserStore();

// Выполняется после монтирования компонента
onMounted(() => {
  // Инициализируем состояние аутентификации
  identificationsStore.initialize();
});
</script>
