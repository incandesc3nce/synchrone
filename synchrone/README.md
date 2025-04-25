# Synchrone Client

Это клиентская часть Synchrone, которая позволяет писать код в реальном времени с другими пользователями. Он использует socket.io для синхронизации текста между разными вкладками браузера.

Проект использует React и Next.js.

## Для запуска

1. Установите Node.js версии 22 (LTS) или выше.

2. Установите зависимости:

```bash
npm install
```

3. Добавьте переменные окружения в `.env` файл:

```bash
NEXT_PUBLIC_WSS_URL=*URL WebSocket сервера*
DATABASE_URL=*URL базы данных PostgreSQL*
```

4. Запустите проект:

```bash
npm run dev
```

5. Откройте [http://localhost:3000](http://localhost:3000) в браузере.
