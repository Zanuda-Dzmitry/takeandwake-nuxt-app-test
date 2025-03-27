<template>
  <div v-if="showContent" class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Личный кабинет</h1>
      <UButton @click="logout" color="red">Выход</UButton>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <UFormGroup label="Дата создания">
        <UInput v-model="dateFilter" type="date" />
      </UFormGroup>

      <UFormGroup label="Категория">
        <USelect
          v-model="categoryFilter"
          :options="categories"
          placeholder="Выберите категории"
        />
      </UFormGroup>

      <UFormGroup label="Статус">
        <USelect
          v-model="statusFilter"
          :options="statusOptions"
          placeholder="Выберите статус"
        />
      </UFormGroup>

      <UFormGroup label="Поиск по названию">
        <UInput v-model="searchQuery" placeholder="Введите название" />
      </UFormGroup>
    </div>

    <UTable :rows="filteredProducts" :columns="columns" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import type { Product } from "../types/types";
import { products } from "~/data/products.data";

// Инициализация хранилища и роутера
const identificationsStore = useIdentificationsUserStore();
const router = useRouter();

// Флаг инициализации для контроля отображения контента
const isInitialized = ref(false);

// Хук жизненного цикла - выполняется при монтировании компонента
onMounted(async () => {
  // Инициализируем хранилище (восстанавливаем сессию из localStorage)
  identificationsStore.initialize();
  isInitialized.value = true;

  // Если пользователь не авторизован - перенаправляем на главную
  if (!identificationsStore.isAuthenticated) {
    router.push("/");
  }
});

// Показываем контент только после инициализации
const showContent = computed(
  () => isInitialized.value && identificationsStore.isAuthenticated
);

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Название" },
  { key: "category", label: "Категория" },
  { key: "status", label: "Статус" },
  { key: "price", label: "Цена" },
  { key: "date_created", label: "Дата создания" },
  { key: "rating", label: "Рейтинг" },
];

// Реактивные ссылки для фильтров
const dateFilter = ref<string>("");
const categoryFilter = ref<string[]>([]);
const statusFilter = ref<string>("");
const searchQuery = ref<string>("");

// Получаем уникальные категории из списка продуктов
const categories = computed(() => {
  return [...new Set(products.map((p) => p.category))];
});

// Опции для фильтра по статусу
const statusOptions = [
  { value: "available", label: "Доступен" },
  { value: "out_of_stock", label: "Нет в наличии" },
  { value: "discontinued", label: "Снят с производства" },
];

// Фильтрация продуктов с правильной типизацией
const filteredProducts = computed<Product[]>(() => {
  return products.filter((product: Product) => {
    // Проверяем соответствие всем фильтрам
    const matchesDate =
      !dateFilter.value || product.date_created === dateFilter.value;
    const matchesCategory =
      categoryFilter.value.length === 0 ||
      categoryFilter.value.includes(product.category);
    const matchesStatus =
      !statusFilter.value || product.status === statusFilter.value;
    const matchesSearch =
      !searchQuery.value ||
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase());

    // Продукт включается в результат, если соответствует всем фильтрам
    return matchesDate && matchesCategory && matchesStatus && matchesSearch;
  });
});

// Функция выхода из системы
const logout = () => {
  identificationsStore.logout();
  router.push("/");
};
</script>
