# Synchrone Websocket Service

Это простой сервис, который позволяет отправлять сообщения и получать их по Websockets или HTTP Long Polling используя библиотеку socket.io

## Для запуска

1. Установите Node.js версии 22 (LTS) или выше.

2. Установите зависимости:

```bash
npm install
```

3. Добавьте переменные окружения в `.env` файл:

```bash
CLIENT_URL=*URL клиента* (например, http://localhost:3000)
```

4. Запустите проект:

```bash
npm start
```

## Тестирование

1. Запустите клиент Synchrone и перейдите на страницу `/editor`. Можно открыть несколько вкладок для наглядности работы сервиса.

2. Попробуйте ввести текст в редакторе на одной из вкладок и посмотрите, как он синхронизируется между вкладками.
