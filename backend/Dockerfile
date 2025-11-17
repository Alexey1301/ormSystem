# Многоэтапная сборка для оптимизации размера образа
# Базовый образ уже содержит: Java 21 JDK + Maven 3.9
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Копирование pom.xml и загрузка зависимостей (кэширование слоев)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Копирование исходного кода
COPY src ./src

# Сборка приложения
RUN mvn clean package -DskipTests

# Финальный образ
# Базовый образ уже содержит: Java 21 JRE (без JDK, только для запуска)
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Создание непривилегированного пользователя
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Копирование JAR файла из этапа сборки
COPY --from=build /app/target/*.jar app.jar

# Переменные окружения
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Открытие порта
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/actuator/health || exit 1

# Запуск приложения
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

