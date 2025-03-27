<template>
  <div class="container mx-auto p-4 max-w-xs">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Username" name="username">
        <UInput v-model="state.username" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <div v-if="identificationsStore.error" class="text-red-500 text-sm mt-2">
        {{ identificationsStore.error }}
      </div>

      <UButton type="submit"> Войти </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
const router = useRouter();

const identificationsStore = useIdentificationsUserStore();

// Схема валидации формы с помощью Yup
const schema = object({
  username: string().required("Введите логин"),
  password: string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Введите пароль"),
});

// Тип для данных формы, выводимый из схемы
type Schema = InferType<typeof schema>;

// Реактивное состояние формы
const state = reactive({
  username: undefined,
  password: undefined,
});

// Обработчик отправки формы
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    // Вызов метода авторизации из хранилища
    identificationsStore.login(event.data.username, event.data.password);

    // Перенаправление после успешной авторизации
    router.push("/account");
  } catch (error) {
    // Логирование ошибок авторизации
    console.error("Ошибка авторизации:", error);
  }
}
</script>
