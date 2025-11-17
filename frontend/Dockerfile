# Этап 1: Сборка React приложения
# Базовый образ уже содержит: Node.js 20 + npm
FROM node:20-alpine AS build

WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci --only=production=false

# Копирование исходного кода
COPY . .

# Build argument для API URL
ARG REACT_APP_API_URL=http://localhost:8080/api
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Сборка приложения
RUN npm run build

# Этап 2: Nginx для статики
# Базовый образ уже содержит: Nginx веб-сервер
FROM nginx:alpine

# Копирование собранного приложения
COPY --from=build /app/build /usr/share/nginx/html

# Копирование конфигурации Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открытие порта
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]

