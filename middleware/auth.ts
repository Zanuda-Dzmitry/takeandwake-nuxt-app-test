export default defineNuxtRouteMiddleware(async (to) => {
  // Инициализируем хранилище аутентификации
  const identificationsStore = useIdentificationsUserStore();

  // Дожидаемся инициализации хранилища
  identificationsStore.initialize();

  if (!identificationsStore.isAuthenticated && to.path !== "/") {
    return navigateTo("/");
  }
});
