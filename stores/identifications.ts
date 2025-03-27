import type { User } from "../types/types";
import { exampleUsers } from "~/data/users.data";

export const useIdentificationsUserStore = defineStore("auth", {
  state: () => ({
    currentUser: null as User | null, // Текущий авторизованный пользователь
    isAuthenticated: false, // Флаг авторизации
    error: null as string | null, // Сообщение об ошибке
  }),
  actions: {
    login(username: string, password: string): boolean {
      // Поиск пользователя в базе данных
      const user = exampleUsers.find(
        (u) =>
          u.credentials.username === username &&
          u.credentials.passphrase === password
      );

      if (user && user.active) {
        this.setAuth(user);
        this.error = null; // Сбрасываем ошибку при успешном входе
        return true;
      }
      this.error = "Неверные учетные данные"; // Устанавливаем сообщение об ошибке
      return false;
    },

    // Устанавливает авторизацию пользователя
    setAuth(user: User): void {
      this.currentUser = user;
      this.isAuthenticated = true;

      // Сохраняем данные аутентификации в localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          username: user.credentials.username,
          timestamp: Date.now(), // Добавляем метку времени
        })
      );
    },

    // Выход из системы
    logout(): void {
      this.currentUser = null;
      this.isAuthenticated = false;
      // Удаляем из localStorage
      localStorage.removeItem("auth");
    },

    // Инициализация состояния аутентификации при загрузке приложения
    initialize(): void {
      const authData = localStorage.getItem("auth");
      if (!authData) return;

      try {
        const { username } = JSON.parse(authData);

        // Поиск пользователя в базе
        const user = exampleUsers.find(
          (u) => u.credentials.username === username
        );

        if (user) {
          this.currentUser = user;
          this.isAuthenticated = true;
        }
      } catch (e) {
        console.error("Ошибка восстановления сессии", e);
        localStorage.removeItem("auth");
      }
    },
  },
});
