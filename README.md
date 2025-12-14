# **Программное средство управления репутацией компании**

---

### Краткое описание проекта

**ORMSystem** – это платформа для автоматизированного сбора, анализа и мониторинга отзывов о компаниях из различных источников. Система решает проблему фрагментированного представления о репутации бизнеса, собирая отзывы из множества платформ в единое пространство для комплексного анализа.

Ранее процесс мониторинга отзывов требовал ручного сбора данных из разных источников, что сопровождалось человеческими ошибками, несвоевременным получением информации и отсутствием единой аналитики. Наша система превращает этот процесс в автоматизированный и прозрачный механизм, где каждый отзыв обрабатывается, анализируется и визуализируется в реальном времени.

Система построена на принципах модульной монолитной архитектуры с использованием Spring Boot, что обеспечивает четкое разделение ответственности между компонентами при сохранении простоты развертывания. Применение слоистой архитектуры (Controller-Service-Repository) и принципов SOLID позволяет создавать гибкое и сопровождаемое решение, способное к дальнейшему масштабированию.

### Цели проекта

- Автоматизировать сбор отзывов из различных платформ (Яндекс, Google, 2GIS)
- Обеспечить централизованное хранение и анализ пользовательских отзывов
- Реализовать систему уведомлений о новых отзывах через Telegram
- Предоставить инструменты для генерации аналитических отчетов
- Снизить время реакции на негативные отзывы за счет оперативного оповещения

### Основные возможности

- Интеграция с популярными платформами отзывов (Yandex, Google, 2GIS)
- Автоматический сбор и обработка отзывов в реальном времени
- Система умных уведомлений через Telegram-бота
- Генерация аналитических отчетов в форматах PDF, Excel, CSV
- Поиск и фильтрация отзывов по различным критериям
- Визуализация статистики и динамики отзывов
- Многопользовательский доступ с разграничением прав

---

## **Содержание**

1. [Архитектура](#архитектура)
	1. [C4-модель](#c4-модель)
	2. [Схема данных](#схема-данных)
2. [Функциональные возможности](#функциональные-возможности)
	1. [UML диаграммы](#uml-диаграммы)
	2. [User-flow диаграммы](#user-flow-диаграммы)
3. [Пользовательский интерфейс](#пользовательский-интерфейс)
	1. [Примеры экранов UI](#примеры-экранов-ui)
4. [Детали реализации](#детали-реализации)
	1. [UML-диаграммы](#uml-диаграммы)
	2. [Спецификация API](#спецификация-api)
	3. [Безопасность](#безопасность)
	4. [Оценка качества кода](#оценка-качества-кода)
5. [Тестирование](#тестирование)
	1. [Unit-тесты](#unit-тесты)
	2. [Интеграционные тесты](#интеграционные-тесты)
6. [Установка и запуск](#установка-и-запуск)
	1. [Развертывание системы](#развертывание-системы)

---

## **Архитектура**

### C4-модель

Система спроектирована как модульный монолит с четким разделением на компоненты, каждый из которых отвечает за конкретную бизнес-функциональность. Взаимодействие клиентского приложения и серверной части происходит через REST API с аутентификацией на основе JWT токенов.

#### Контейнерный уровень

Система состоит из следующих основных контейнеров:

- **SPA клиент** (React) - веб-интерфейс для работы с системой
- **Server** (Spring Boot) - ядро системы с модульной архитектурой
- **ORM Database** (PostgreSQL) - основное хранилище данных
- **Object Storage** - S3-совместимое хранилище
- **Review Platforms APIs** – Внешние API-платформы

<img width="761" height="668" alt="image" src="https://github.com/user-attachments/assets/85867971-8dfa-4b80-8571-ddc5e8ba8a61" />


#### Компонентный уровень

Система разделена на четыре основных модуля:

**Модуль аутентификации и безопасности**:
- AuthController - контроллер управления аутентификацией
- AuthService - слой бизнес-логики аутентификации
- UserRepository - слой доступа к данным пользователей
- TokenService – сервис управления токенами
- UserController – контроллер управления пользователями
- UserService – бизнес-логика управления пользователями
- User – сущность, представляющая пользователя

<img width="761" height="561" alt="image" src="https://github.com/user-attachments/assets/79b39057-db66-460f-9984-5248e2991887" />


**Модуль отчетности**:
- ReportsController - контроллер управления отчетами
- ReportService - слой бизнес-логики работы с отчетами
- Report – сущность, представляющая объект «Отчет»
- ReportRepository – слой доступа к данным отчетов
- TemplateEngine - компонент генерации отчетов

<img width="416" height="655" alt="image" src="https://github.com/user-attachments/assets/9c6937ea-f34b-453d-8429-ee5d861aa96e" />


**Модуль поиска**:
- SearchController - контроллер управления поиском
- SearchService - слой бизнес-логики, выполняющий операции поиска
- SearchParser – компонент для работы с внешними отзывами и источниками данных
- Search – сущность, описывающая процесс или результат поиска
- SearchRepository – слой доступа к данным поиска

<img width="695" height="564" alt="image" src="https://github.com/user-attachments/assets/ac03f358-2af9-45cf-864c-5a06b8e02411" />


**Модуль организации**:
– OrganizationController – контроллер управления организациями
– OrganizationService – бизнес-логика работы с организациями
– Organization – сущность, представляющая объект «Организация»
– OrganizationRepository – слой доступа к данным организаций

<img width="210" height="530" alt="image" src="https://github.com/user-attachments/assets/beebaf33-c6fc-4ed5-b968-fe235cab790d" />

### Схема данных

<img width="717" height="801" alt="image" src="https://github.com/user-attachments/assets/3867001a-4df0-48cd-9b3c-956aa9b7acdf" />

---

## **Функциональные возможности**

### UML диаграммы

#### Диаграмма пакетов программного средства



#### Диаграмма развертывания программного средства



#### Диаграмма вариантов использования



#### Диаграмма состояний объекта «Задача»



#### Диаграмма последовательности процесса работа над задачей


#### Диаграмма активности процесса обработки отзыва 

### User-flow диаграммы

User-flow диаграмма процесса авторизации и порлучениия доступа к личному кабинету 

<img width="382" height="546" alt="image" src="https://github.com/user-attachments/assets/1ea74178-b67f-48df-a7e3-45673bcbb8b4" />

User-flow диаграмма для роли "Администратор"

<img width="486" height="624" alt="image" src="https://github.com/user-attachments/assets/303e7415-c5b5-4f26-b648-00b442a43c9b" />

User-flow диаграмма для роли "Управляющий"

<img width="623" height="616" alt="image" src="https://github.com/user-attachments/assets/2ced4058-3f6d-412f-bf1e-e2383c831353" />

User-flow диаграмма для роли "Модератор"

<img width="584" height="560" alt="image" src="https://github.com/user-attachments/assets/5feacc36-aeef-4941-906c-581edaa5becf" />

User-flow диаграмма для роли "Специалист"

<img width="512" height="694" alt="image" src="https://github.com/user-attachments/assets/cdc885ca-86d7-4a89-87c4-14bcd456ae93" />

---

## **Пользовательский интерфейс**

### **Примеры экранов UI**


#### **Общие страницы**

– страница авторизации

<img width="1440" height="820" alt="image" src="https://github.com/user-attachments/assets/62b30c1a-f7c8-401b-bf9a-cf528d47c3b2" />

– страница "Профиль"

<img width="1440" height="758" alt="image" src="https://github.com/user-attachments/assets/793c35af-2503-4f39-9b71-5b6168eab1a0" />


#### **Страницы роли "Администратор"**

– страница "Управление пользователями"

<img width="1432" height="816" alt="image" src="https://github.com/user-attachments/assets/57a22c49-cdec-4cfd-9366-1801b92f8c8a" />


#### **Страницы роли "Управляющий"**

– страница "Управление компаниями"

<img width="1440" height="820" alt="image" src="https://github.com/user-attachments/assets/d9b67044-79ea-446c-9fb6-d3b02a01a567" />

– страница "Сводный отчет"

<img width="1440" height="820" alt="image" src="https://github.com/user-attachments/assets/2fb5a50f-568d-44d1-af43-74260aee0c08" />

– страница "Тональность"

<img width="1440" height="818" alt="image" src="https://github.com/user-attachments/assets/a796111f-1139-439d-8b60-43b60bf3ef21" />

– страница "Источники"

<img width="1440" height="455" alt="image" src="https://github.com/user-attachments/assets/ca3e924d-4b6f-4b42-932c-1e1b23bbcbcb" />
<img width="1440" height="820" alt="image" src="https://github.com/user-attachments/assets/ee3b45e8-e529-4a9c-9a67-b7a70f4c79b8" />

– страница "География"

<img width="1440" height="607" alt="image" src="https://github.com/user-attachments/assets/3616fa54-33df-47b8-8fe3-f850e718c97b" />
<img width="1440" height="820" alt="image" src="https://github.com/user-attachments/assets/ff561495-7885-46b4-965f-ec3b2b3a6baa" />


#### **Страницы роли "Модератор"**

– страница "Источники"

<img width="1440" height="821" alt="image" src="https://github.com/user-attachments/assets/4639abb2-6a4f-4713-96a0-f98240163bb5" />

– страница "Отзызвы"

<img width="1440" height="820" alt="image" src="https://github.com/user-attachments/assets/20184e86-3f4b-468b-bf9e-365a3eb6f05f" />

– страница "Задачи"

<img width="1440" height="820" alt="image" src="https://github.com/user-attachments/assets/a6866b91-adea-441e-8624-ab49f984d10e" />


#### **Страницы роли "Специалист"**

– страница "Мои задачи"

<img width="1440" height="820" alt="image" src="https://github.com/user-attachments/assets/226bda3b-0b75-4e6b-a146-48d657656d55" /> 
<img width="1440" height="821" alt="image" src="https://github.com/user-attachments/assets/b1a974d6-6817-4090-a7ce-7f9303efdc05" />

– страница "Моя статистика"

<img width="1440" height="682" alt="image" src="https://github.com/user-attachments/assets/39248bba-5cdd-47c9-8d5b-f312c327f7b1" />


## **Детали реализации**

### UML-диаграммы

Система реализована с использованием принципов SOLID и лучших практик Spring Boot:
- Слоистая архитектура (Controller-Service-Repository)
- Dependency Injection для управления зависимостями
- Repository pattern для абстракции доступа к данным
- Четкое разделение интерфейсов и реализаций

### Спецификация API

Для обеспечения единообразного доступа к функциональности серверной части и повышения удобства разработки была сформирована полноценная спецификация REST API с использованием библиотеки **SpringDoc OpenAPI**. Этот инструмент автоматически генерирует документацию на основании кода контроллеров, их аннотаций и описаний моделей данных, что гарантирует актуальность и соответствие спецификации фактической реализации системы.

Спецификация включает документацию для всех ключевых модулей системы — аутентификации и управления токенами, управления пользователями, управления компаниями, управления источниками отзывов, работы с отзывами, управления задачами, работы с ответами и комментариями, генерации отчетов и аналитики. Благодаря автоматической генерации структура API всегда синхронизирована с текущим состоянием серверного кода, а разработчики и тестировщики получают прозрачное представление о доступных маршрутах и правилах их использования.

#### Доступ к документации API

**Swagger UI:**
- При запущенном приложении документация доступна по адресу: `http://localhost:8080/swagger-ui.html`
- Swagger UI предоставляет интерактивный интерфейс для просмотра всех endpoints, их параметров, схем данных и возможности тестирования API напрямую из браузера

**OpenAPI спецификация:**
- Статическая спецификация в формате OpenAPI 3.0 доступна в файле: [`backend/openapi.yaml`](backend/openapi.yaml)
- Файл содержит полное описание всех endpoints, моделей данных, схем безопасности и примеров запросов/ответов

**Импорт в Postman:**
- Для импорта API в Postman используйте файл [`backend/openapi.yaml`](backend/openapi.yaml)
- В Postman: File → Import → выберите файл `openapi.yaml`
- После импорта все endpoints будут доступны в коллекции с автоматически настроенными схемами запросов и валидацией

#### Основные группы endpoints

REST API включает endpoints для:
- **Аутентификации и авторизации** (`/api/auth/**`) — вход, выход, обновление токенов
- **Управления пользователями** (`/api/users/**`) — CRUD операции с пользователями, управление паролями
- **Управления компаниями** (`/api/companies/**`) — создание, обновление, удаление компаний, получение статистики
- **Управления источниками** (`/api/sources/**`) — управление источниками отзывов (Яндекс, Google, 2GIS)
- **Работы с отзывами** (`/api/reviews/**`) — просмотр, фильтрация, обновление тональности отзывов
- **Управления задачами** (`/api/tasks/**`) — создание, назначение, управление жизненным циклом задач
- **Работы с ответами** (`/api/responses/**`) — создание ответов на отзывы, одобрение, публикация
- **Работы с комментариями** (`/api/comments/**`) — комментарии к задачам
- **Управления отчетами** (`/api/reports/**`) — генерация отчетов в различных форматах (PDF, Excel, CSV)
- **Аналитики** (`/api/analytics/**`) — получение статистики, анализа тональности, динамики отзывов

Подробная документация по использованию API доступна в файле [`backend/API_DOCUMENTATION.md`](backend/API_DOCUMENTATION.md).

### Безопасность

## 1. Технологический стек

В проекте используется современный стек технологий для обеспечения высокого уровня безопасности и производительности:

**Spring Security 6**  
Комплексная система защиты приложений, обеспечивающая аутентификацию, авторизацию, защиту от CSRF/XSS атак, интеграцию с различными механизмами аутентификации. Версия 6 полностью совместима с Jakarta EE и предоставляет современный функциональный API.

**JJWT 0.12.3** (Java JWT Library)  
Библиотека для работы с JSON Web Tokens. Поддерживает создание, парсинг и валидацию JWT с различными алгоритмами подписи (HS256, HS512, RS256 и др.). Обеспечивает type-safe работу с claims и автоматическую проверку expiration.

**BCrypt Password Encoder**  
Алгоритм хеширования паролей, встроенный в Spring Security. Использует адаптивный подход с конфигурируемым количеством раундов (по умолчанию 10), автоматически генерирует уникальную соль для каждого пароля. Устойчив к rainbow table атакам.

## 2. Конфигурация Spring Security

Конфигурация безопасности является центральным компонентом системы и определяет правила доступа к различным endpoints приложения. Класс `SecurityConfig` использует возможности Spring Security 6 для настройки следующих аспектов:

- **Отключение CSRF-защиты**, так как приложение использует stateless JWT аутентификацию, где токены передаются в заголовках, а не в cookies
- **Настройка режима управления сессиями как STATELESS** — сервер не создает и не хранит HTTP-сессии
- **Определение публичных endpoints**, доступных без аутентификации (`/auth/**`)
- **Регистрация кастомного JWT фильтра** для проверки токенов в каждом запросе
- **Настройка обработчика ошибок** для неавторизованных запросов (возврат 401 Unauthorized)

Аннотации `@EnableWebSecurity` и `@EnableMethodSecurity` активируют механизмы защиты на уровне веб-запросов и методов соответственно, позволяя использовать `@PreAuthorize` для контроля доступа на уровне контроллеров.

### Код SecurityConfig.java

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthenticationEntryPoint unauthorizedHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) 
            throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configure(http))
            .exceptionHandling(exception -> 
                exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/actuator/**").permitAll()
                .anyRequest().authenticated()
            );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthenticationFilter, 
                              UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
```

---

## 3. Конфигурация application.yml

Настройки JWT токенов, подключения к базе данных и другие параметры приложения вынесены в файл конфигурации `application.yml`. Использование переменных окружения через синтаксис `${VAR_NAME:default_value}` позволяет гибко управлять параметрами в разных окружениях (development, production) без изменения кода.

### Код application.yml

```yaml
spring:
  application:
    name: reputation-management-system

  datasource:
    url: jdbc:postgresql://localhost:5432/reputation_db
    username: postgres
    password: ${DB_PASSWORD:postgres}
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 20000

  jpa:
    hibernate:
      ddl-auto: none
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
        jdbc:
          lob:
            non_contextual_creation: true
    open-in-view: false

server:
  port: 8080
  servlet:
    context-path: /api

# JWT Configuration
jwt:
  secret: ${JWT_SECRET:your-secret-key-change-this-in-production-must-be-at-least-256-bits-long}
  access-token-expiration: 900000      # 15 минут (в миллисекундах)
  refresh-token-expiration: 604800000  # 7 дней (в миллисекундах)

# CORS Configuration
cors:
  allowed-origins: http://localhost:3000
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS,PATCH
  allowed-headers: '*'
  allow-credentials: true
```

---

## 4. Компонент JwtTokenProvider

`JwtTokenProvider` является утилитным классом, инкапсулирующим всю логику работы с JWT токенами. Он выполняет три ключевые функции: генерацию токенов с цифровой подписью, валидацию подписи и срока действия полученных токенов, а также извлечение пользовательских данных (claims) из payload токена.

Для подписи токенов используется алгоритм **HS512** (HMAC with SHA-512). Этот симметричный алгоритм был выбран вместо HS256 благодаря более высокой криптостойкости — использует 512-битный хеш вместо 256-битного, что обеспечивает дополнительную защиту от возможных атак на подпись. Секретный ключ никогда не передается в токене и известен только серверу, что гарантирует невозможность подделки токена без знания ключа.

Важной особенностью реализации является минималистичный payload — в токене хранится только ID пользователя (subject), время выдачи (issuedAt) и время истечения (expiration). Никакие чувствительные данные (пароль, email, роли) не включаются в токен, что снижает риски при компрометации.

### Код JwtTokenProvider.java

```java
@Component
@Slf4j
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access-token-expiration}")
    private long jwtAccessTokenExpiration;

    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateAccessToken(Long userId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtAccessTokenExpiration);

        return Jwts.builder()
            .subject(String.valueOf(userId))
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(getSigningKey(), Jwts.SIG.HS512)  // Явно указываем HS512
            .compact();
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(authToken);
            return true;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty");
        }
        return false;
    }
}
```

---

## 5. Фильтр JwtAuthenticationFilter

`JwtAuthenticationFilter` является ключевым компонентом в цепочке фильтров Spring Security. Он наследуется от `OncePerRequestFilter`, что гарантирует выполнение фильтра ровно один раз на каждый HTTP-запрос, даже в случае internal forwards или includes.

Фильтр перехватывает каждый входящий запрос **до того**, как он достигнет контроллера, и выполняет следующую последовательность действий: извлечение JWT токена из заголовка `Authorization: Bearer <token>`, валидацию токена через `JwtTokenProvider`, извлечение ID пользователя из токена, загрузку полных данных пользователя из БД (включая роли), создание объекта `Authentication` и установку его в `SecurityContextHolder`.

### Код JwtAuthenticationFilter.java

```java
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            // 1. Извлечение JWT токена из заголовка Authorization
            String jwt = getJwtFromRequest(request);

            // 2. Проверка наличия и валидности токена
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                // 3. Извлечение userId из токена
                Long userId = tokenProvider.getUserIdFromToken(jwt);

                // 4. Загрузка полных данных пользователя из БД
                UserDetails userDetails = userDetailsService.loadUserById(userId);
                
                // 5. Создание объекта Authentication
                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                        userDetails, 
                        null, 
                        userDetails.getAuthorities()
                    );
                authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 6. Установка Authentication в SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.debug("Set authentication for user: {}", userId);
            }
        } catch (Exception ex) {
            log.error("Could not set user authentication in security context", ex);
        }

        // 7. Передача запроса дальше по цепочке фильтров
        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);  // Удаляем префикс "Bearer "
        }
        return null;
    }
}
```

---

## 6. Сервис AuthService

Компонент `AuthService` реализует бизнес-логику всех операций аутентификации и служит координационным слоем между контроллерами (presentation layer) и низкоуровневыми сервисами безопасности. Он инкапсулирует сложную логику взаимодействия с `AuthenticationManager`, `JwtTokenProvider` и `RefreshTokenService`.

Основные обязанности сервиса включают: проверку учетных данных (credentials) при входе через делегирование в Spring Security, генерацию пары access и refresh токенов, обновление времени последнего входа пользователя для аудита, обновление access токена с использованием refresh токена, и удаление refresh токена при выходе из системы.

### Код AuthService.java

```java
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserRepository userRepository;

    @Transactional
    public JwtResponse login(LoginRequest loginRequest) {
        // 1. Аутентификация через Spring Security
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 2. Получение аутентифицированного пользователя
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        // 3. Генерация access token
        String accessToken = tokenProvider.generateAccessToken(authentication);

        // 4. Получение полного объекта User из БД
        User user = userRepository.findById(userPrincipal.getId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // 5. Удаление старых refresh токенов (single session)
        refreshTokenService.deleteByUser(user);

        // 6. Создание нового refresh token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        // 7. Обновление времени последнего входа
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        log.info("User {} logged in successfully", user.getUsername());

        // 8. Формирование ответа с токенами
        return JwtResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken.getToken())
            .tokenType("Bearer")
            .expiresIn(tokenProvider.getAccessTokenExpiration() / 1000)
            .user(JwtResponse.UserInfo.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .companyId(user.getCompany() != null ? user.getCompany().getId() : null)
                .build())
            .build();
    }

    @Transactional
    public JwtResponse refreshToken(RefreshTokenRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
            .map(refreshTokenService::verifyExpiration)  // Проверка срока действия
            .map(RefreshToken::getUser)
            .map(user -> {
                // Генерация нового access token
                String newAccessToken = tokenProvider.generateAccessToken(user.getId());
                
                log.info("Access token refreshed for user {}", user.getUsername());

                return JwtResponse.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(requestRefreshToken)  // Refresh token не меняется
                    .tokenType("Bearer")
                    .expiresIn(tokenProvider.getAccessTokenExpiration() / 1000)
                    .build();
            })
            .orElseThrow(() -> new TokenRefreshException(
                requestRefreshToken, 
                "Refresh token not found"
            ));
    }

    @Transactional
    public void logout(RefreshTokenRequest request) {
        refreshTokenService.deleteByToken(request.getRefreshToken());
        SecurityContextHolder.clearContext();
        log.info("User logged out successfully");
    }
}
```

---

## 7. Процесс аутентификации (Login Flow)

Процесс входа пользователя в систему представляет собой многоступенчатый механизм, обеспечивающий надежную проверку подлинности. При успешной аутентификации пользователь получает пару токенов (access и refresh), которые сохраняются на стороне клиента и используются для всех последующих запросов к API.

В процессе аутентификации задействовано множество компонентов Spring Security и кастомных классов приложения, каждый из которых выполняет свою специфическую роль в общей цепочке проверки подлинности. Вся цепочка реализована как транзакционная операция, что гарантирует атомарность — либо все шаги выполняются успешно, либо изменения откатываются.

### Диаграмма последовательности Login Flow

```
┌──────┐                  ┌────────────────┐                ┌───────────────┐
│Client│                  │AuthController  │                │  AuthService  │
└──┬───┘                  └───────┬────────┘                └───────┬───────┘
   │                              │                                 │
   │ POST /api/auth/login         │                                 │
   │ {username, password}         │                                 │
   │─────────────────────────────>│                                 │
   │                              │                                 │
   │                              │ @Valid валидация                │
   │                              │ LoginRequest                    │
   │                              │                                 │
   │                              │ login(LoginRequest)             │
   │                              │────────────────────────────────>│
   │                              │                                 │
   │                              │                       ┌─────────┴─────────┐
   │                              │                       │AuthenticationManager│
   │                              │                       └─────────┬─────────┘
   │                              │  authenticate()                 │
   │                              │ ────────────────────────────────>│
   │                              │                                 │
   │                              │                       ┌─────────┴──────────┐
   │                              │                       │UserDetailsServiceImpl│
   │                              │                       └─────────┬──────────┘
   │                              │ loadUserByUsername()            │
   │                              │ ────────────────────────────────>│
   │                              │                                 │
   │                              │                                 │ SELECT * FROM user
   │                              │                                 │ WHERE username = ?
   │                              │                                 │
   │                              │  UserPrincipal                  │
   │                              │ <────────────────────────────────│
   │                              │                                 │
   │                              │  BCrypt.matches()               │
   │                              │ ────────────────────────────────>│
   │                              │                                 │
   │                              │  Authentication (success)       │
   │                              │ <────────────────────────────────│
   │                              │                                 │
   │                              │                      ┌──────────┴──────────┐
   │                              │                      │ JwtTokenProvider    │
   │                              │                      └──────────┬──────────┘
   │                              │  generateAccessToken(userId)    │
   │                              │ ────────────────────────────────>│
   │                              │                                 │
   │                              │  JWT token (HS512 signed)       │
   │                              │ <────────────────────────────────│
   │                              │                                 │
   │                              │                    ┌────────────┴──────────┐
   │                              │                    │RefreshTokenService    │
   │                              │                    └────────────┬──────────┘
   │                              │  createRefreshToken(user)       │
   │                              │ ────────────────────────────────>│
   │                              │                                 │
   │                              │                                 │ INSERT INTO refresh_token
   │                              │                                 │ (user_id, token, expiry_date)
   │                              │                                 │
   │                              │  RefreshToken (UUID)            │
   │                              │ <────────────────────────────────│
   │                              │                                 │
   │                              │                                 │ UPDATE user
   │                              │                                 │ SET last_login = NOW()
   │                              │                                 │
   │                              │  JwtResponse                    │
   │                              │ <────────────────────────────────│
   │                              │                                 │
   │  200 OK                      │                                 │
   │  {                           │                                 │
   │    "accessToken": "eyJ...",  │                                 │
   │    "refreshToken": "uuid",   │                                 │
   │    "tokenType": "Bearer",    │                                 │
   │    "expiresIn": 900,         │                                 │
   │    "user": {...}             │                                 │
   │  }                           │                                 │
   │<─────────────────────────────│                                 │
   │                              │                                 │
```

### Классы, участвующие в процессе аутентификации

**1. AuthController** (`controller/AuthController.java`)  
**Роль:** REST endpoint, точка входа для HTTP запросов аутентификации.  
**Ответственность:** Валидация входных данных через `@Valid`, делегирование в `AuthService`, формирование HTTP ответа.

**2. LoginRequest** (DTO)  
**Роль:** Data Transfer Object для входных данных.  
**Поля:** `username` (String), `password` (String) с аннотациями валидации `@NotBlank`.

**3. AuthService** (`service/AuthService.java`)  
**Роль:** Координатор процесса аутентификации, бизнес-логика.  
**Методы:** `login()`, `refreshToken()`, `logout()`.

**4. AuthenticationManager** (Spring Security)  
**Роль:** Центральный компонент проверки credentials.  
**Реализация:** `ProviderManager` делегирует в `DaoAuthenticationProvider`.

**5. DaoAuthenticationProvider** (Spring Security)  
**Роль:** Провайдер аутентификации для username/password.  
**Действия:** Загружает пользователя через `UserDetailsService`, проверяет пароль через `PasswordEncoder`.

**6. UserDetailsServiceImpl** (`security/UserDetailsServiceImpl.java`)  
**Роль:** Загрузка пользователя из БД.  
**Методы:** `loadUserByUsername(String username)`, `loadUserById(Long id)`.

```java
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(
                "User not found: " + username));
        
        if (!user.getIsActive()) {
            throw new UsernameNotFoundException("User inactive: " + username);
        }

        return UserPrincipal.create(user);
    }
}
```

**7. UserRepository** (Spring Data JPA)  
**Роль:** Доступ к таблице `user` в БД.  
**Методы:** `findByUsername(String)`, `findById(Long)`, `existsByUsername(String)`.

**8. User** (`model/User.java`)  
**Роль:** JPA Entity, доменная модель пользователя.  
**Поля:** id, username, email, passwordHash, role, company, isActive, createdAt, lastLogin.

**9. UserPrincipal** (`security/UserPrincipal.java`)  
**Роль:** Адаптер между доменной моделью `User` и Spring Security `UserDetails`.  
**Методы:** Реализует `getAuthorities()` — преобразует роль в `GrantedAuthority`.

```java
@Data
@AllArgsConstructor
public class UserPrincipal implements UserDetails {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public static UserPrincipal create(User user) {
        List<GrantedAuthority> authorities = List.of(
            new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );

        return new UserPrincipal(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getPasswordHash(),
            authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
```

**10. PasswordEncoder** (BCryptPasswordEncoder)  
**Роль:** Проверка пароля.  
**Метод:** `matches(String rawPassword, String encodedPassword)` — хеширует введенный пароль и сравнивает хеши.

**11. JwtTokenProvider** (`security/jwt/JwtTokenProvider.java`)  
**Роль:** Генерация access токена.  
**Метод:** `generateAccessToken(Long userId)` — создает JWT с подписью HS512.

**12. RefreshTokenService** (`service/RefreshTokenService.java`)  
**Роль:** Управление refresh токенами.  
**Метод:** `createRefreshToken(User user)` — генерирует UUID и сохраняет в БД.

```java
public RefreshToken createRefreshToken(User user) {
    RefreshToken refreshToken = RefreshToken.builder()
        .user(user)
        .token(UUID.randomUUID().toString())
        .expiryDate(LocalDateTime.now().plusSeconds(refreshTokenDurationMs / 1000))
        .build();

    return refreshTokenRepository.save(refreshToken);
}
```

**13. RefreshToken** (`model/RefreshToken.java`)  
**Роль:** JPA Entity для таблицы `refresh_token`.  
**Поля:** id, user, token (UUID), expiryDate, createdAt.

**14. RefreshTokenRepository** (Spring Data JPA)  
**Роль:** Доступ к таблице `refresh_token`.  
**Методы:** `save()`, `findByToken()`, `deleteByUser()`.

**15. JwtResponse** (DTO)  
**Роль:** Response объект с токенами и информацией о пользователе.  
**Поля:** accessToken, refreshToken, tokenType ("Bearer"), expiresIn (900 секунд), user (UserInfo DTO).

---

## 8. Процесс авторизации (Protected Request Flow)

После успешного входа каждый запрос к защищенным endpoints должен содержать JWT токен в заголовке `Authorization`. Процесс проверки прав доступа выполняется в несколько этапов: сначала валидация токена и установка Authentication через `JwtAuthenticationFilter`, затем проверка роли пользователя через аннотацию `@PreAuthorize` на уровне метода контроллера.

Важно понимать разницу между **аутентификацией** (authentication — кто ты?) и **авторизацией** (authorization — что ты можешь делать?). Аутентификация выполняется фильтром на основе JWT токена, авторизация — Spring Security на основе ролей в `Authentication.authorities`.

### Диаграмма последовательности Authorization Flow

```
┌──────┐           ┌─────────────────────┐     ┌───────────────────┐    ┌─────────────┐
│Client│           │JwtAuthFilter        │     │JwtTokenProvider   │    │UserController│
└──┬───┘           └──────────┬──────────┘     └─────────┬─────────┘    └──────┬──────┘
   │                          │                          │                     │
   │ GET /api/users           │                          │                     │
   │ Authorization: Bearer... │                          │                     │
   │─────────────────────────>│                          │                     │
   │                          │                          │                     │
   │                          │ validateToken(jwt)       │                     │
   │                          │─────────────────────────>│                     │
   │                          │                          │                     │
   │                          │ true (valid)             │                     │
   │                          │<─────────────────────────│                     │
   │                          │                          │                     │
   │                          │ getUserIdFromToken(jwt)  │                     │
   │                          │─────────────────────────>│                     │
   │                          │                          │                     │
   │                          │ userId = 1               │                     │
   │                          │<─────────────────────────│                     │
   │                          │                          │                     │
   │              ┌───────────┴─────────────┐            │                     │
   │              │UserDetailsServiceImpl   │            │                     │
   │              └───────────┬─────────────┘            │                     │
   │                          │ loadUserById(1)          │                     │
   │                          │────────────────>         │                     │
   │                          │                          │                     │
   │                          │ UserPrincipal            │                     │
   │                          │ (authorities: ROLE_ADMIN)│                     │
   │                          │<────────────────         │                     │
   │                          │                          │                     │
   │                          │ SecurityContext.setAuth()│                     │
   │                          │                          │                     │
   │                          │                          │                     │
   │                          ├──────────────────────────┼────────────────────>│
   │                          │                          │                     │
   │                          │          @PreAuthorize("hasRole('ADMIN')")    │
   │                          │                          │  ✓ Проверка роли   │
   │                          │                          │                     │
   │                          │                          │  getAllUsers()      │
   │                          │                          │                     │
   │                          │                          │  ┌──────────────────┴──┐
   │                          │                          │  │UserRepository       │
   │                          │                          │  └──────────────────┬──┘
   │                          │                          │   SELECT * FROM user │
   │                          │                          │  <──────────────────  │
   │                          │                          │                     │
   │  200 OK                  │                          │                     │
   │  [ {...users...} ]       │                          │                     │
   │<─────────────────────────┼──────────────────────────┼─────────────────────│
   │                          │                          │                     │
```

### Классы, участвующие в процессе авторизации

**1. JwtAuthenticationFilter**  
Выполняет первичную валидацию токена и устанавливает `Authentication` в `SecurityContext`. Без этого шага все запросы будут отклонены с 401.

**2. JwtTokenProvider**  
Валидирует JWT (подпись + expiration) и извлекает `userId` из токена.

**3. UserDetailsServiceImpl**  
Загружает полные данные пользователя из БД, включая роль.

**4. UserPrincipal**  
Преобразует роль пользователя в `GrantedAuthority` с префиксом `ROLE_` (например, `ROLE_ADMIN`). Этот префикс требуется для `@PreAuthorize("hasRole('...')")`.

**5. SecurityContextHolder** (Spring Security)  
Thread-local хранилище для `Authentication`. Все компоненты Spring Security получают доступ к текущему пользователю через него.

**6. MethodSecurityExpressionHandler** (Spring Security)  
Обрабатывает SpEL-выражения в `@PreAuthorize`. Проверяет, есть ли у пользователя требуемая роль.

**7. UserController**  
Содержит защищенные методы с аннотацией `@PreAuthorize`.

```java
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        // Выполняется только если роль = ADMIN
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        // Выполняется если роль = ADMIN или MANAGER
        return ResponseEntity.ok(userRepository.findById(id).orElseThrow());
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        // Любой аутентифицированный пользователь
        return ResponseEntity.ok(userRepository.findById(currentUser.getId()).orElseThrow());
    }
}
```

**8. GlobalExceptionHandler**  
Обрабатывает исключение `AccessDeniedException` (недостаточно прав) и возвращает HTTP 403 Forbidden.

```java
@ExceptionHandler(AccessDeniedException.class)
public ResponseEntity<Map<String, Object>> handleAccessDeniedException(AccessDeniedException ex) {
    Map<String, Object> response = new HashMap<>();
    response.put("timestamp", LocalDateTime.now());
    response.put("status", HttpStatus.FORBIDDEN.value());
    response.put("error", "Forbidden");
    response.put("message", "You don't have permission to access this resource");
    
    return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
}
```

---

## 9. Ролевая модель доступа (RBAC)

Система использует ролевую модель управления доступом (RBAC - Role-Based Access Control) с четырьмя ролями: **ADMIN**, **MANAGER**, **MODERATOR**, **SPECIALIST**. Каждая роль имеет строго определенный набор прав, что обеспечивает принцип наименьших привилегий (Principle of Least Privilege) — пользователь имеет только те права, которые необходимы для выполнения его обязанностей.

Роли реализованы как ENUM в PostgreSQL (тип `user_role`) и Java (enum `UserRole`). Это обеспечивает типобезопасность на уровне БД и приложения. Доступ к endpoints контролируется аннотацией `@PreAuthorize` на уровне методов контроллеров, что обеспечивает декларативный и гранулярный контроль доступа.

### Матрица доступа к endpoints

| Endpoint | ADMIN | MANAGER | MODERATOR | SPECIALIST | Описание |
|----------|-------|---------|-----------|------------|----------|
| **Аутентификация** |
| POST /auth/login | ✅ | ✅ | ✅ | ✅ | Вход в систему |
| POST /auth/refresh | ✅ | ✅ | ✅ | ✅ | Обновление токена |
| POST /auth/logout | ✅ | ✅ | ✅ | ✅ | Выход из системы |
| **Пользователи** |
| GET /users/me | ✅ | ✅ | ✅ | ✅ | Свой профиль |
| GET /users | ✅ | ❌ | ❌ | ❌ | Список всех пользователей |
| GET /users/{id} | ✅ | ✅ | ❌ | ❌ | Профиль по ID |
| POST /users | ✅ | ❌ | ❌ | ❌ | Создание пользователя |
| PUT /users/{id}/reset-password | ✅ | ❌ | ❌ | ❌ | Сброс пароля администратором |
| PUT /users/me/password | ✅ | ✅ | ✅ | ✅ | Смена своего пароля |

### Примеры использования @PreAuthorize

**Только ADMIN:**
```java
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/users")
public List<User> getAllUsers() {
    return userRepository.findAll();
}

@PreAuthorize("hasRole('ADMIN')")
@PostMapping("/users")
public User createUser(@RequestBody CreateUserRequest request) {
    return userService.createUser(request);
}
```

**ADMIN или MANAGER:**
```java
@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
@GetMapping("/users/{id}")
public User getUserById(@PathVariable Long id) {
    return userRepository.findById(id).orElseThrow();
}
```

**Любой аутентифицированный пользователь:**
```java
@GetMapping("/me")
public User getCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
    return userRepository.findById(currentUser.getId()).orElseThrow();
}
```

**Доступ к своему ресурсу:**
```java
@PreAuthorize("#userId == authentication.principal.id or hasRole('ADMIN')")
@GetMapping("/users/{userId}/tasks")
public List<Task> getUserTasks(@PathVariable Long userId) {
    // Пользователь может видеть только свои задачи, ADMIN видит все
    return taskRepository.findByUserId(userId);
}
```

---

## 10. Результаты

В ходе реализации системы аутентификации и авторизации были достигнуты следующие результаты:

**1. Шифрование паролей**  
Реализовано необратимое хеширование паролей с использованием алгоритма **BCrypt** (10 раундов). Каждый пароль автоматически получает уникальную соль, встроенную в хеш, что исключает возможность использования rainbow tables для взлома. Даже при компрометации базы данных злоумышленники не смогут восстановить исходные пароли.

**2. Двухуровневая система токенов**  
Реализован механизм **access + refresh токенов**, обеспечивающий баланс между безопасностью и удобством. Access токен живет 15 минут, минимизируя окно уязвимости при перехвате. Refresh токен живет 7 дней, позволяя пользователю работать без постоянного ввода пароля. Refresh токены хранятся в БД и могут быть отозваны.

**3. Настройка CORS**  
Политика CORS настроена для взаимодействия только с доверенным frontend-доменом (`http://localhost:3000`). Это предотвращает несанкционированный доступ к API из сторонних веб-приложений. Настройка включает разрешенные методы (GET, POST, PUT, DELETE), заголовки и credentials.

**4. Защита от CSRF**  
CSRF-атаки исключены благодаря использованию stateless JWT аутентификации. Токены передаются в заголовке `Authorization`, а не в cookies, что делает невозможным выполнение CSRF атак (браузер не отправляет заголовки автоматически при cross-origin запросах).

**5. Защита от SQL Injection**  
Все запросы к базе данных выполняются через **JPA с Prepared Statements**, что автоматически экранирует пользовательский ввод и предотвращает SQL инъекции. Spring Data JPA генерирует безопасные запросы на основе сигнатур методов.

**6. Ролевая модель доступа (RBAC)**  
Реализована ролевая модель с 4 ролями (ADMIN, MANAGER, MODERATOR, SPECIALIST) и детальным контролем доступа к каждому endpoint через аннотацию `@PreAuthorize`. Обеспечен принцип наименьших привилегий — пользователь имеет только необходимые права.

**7. Централизованное управление пользователями**  
Только администратор может создавать новых пользователей и сбрасывать пароли, что обеспечивает контроль доступа и предотвращает самостоятельную регистрацию. Любой пользователь может сменить свой пароль, зная текущий.

**8. Аудит и логирование**  
Все критические операции (login, logout, password reset, password change) логируются с указанием пользователя и времени. Поле `last_login` в таблице `user` позволяет отслеживать последнюю активность.

---

## 11. Тестирование

Все endpoints системы аутентификации и управления пользователями были протестированы с использованием **Postman**. Ниже представлены примеры успешных и неуспешных сценариев.

### Тестовые пользователи

| Username | Password | Role | Email | Описание |
|----------|----------|------|-------|----------|
| admin | password123 | ADMIN | admin@example.com | Полный доступ |
| manager | password123 | MANAGER | manager@example.com | Управление и отчеты |
| moderator | password123 | MODERATOR | moderator@example.com | Модерация контента |
| specialist | password123 | SPECIALIST | specialist@example.com | Работа с задачами |

### Сценарии тестирования

**1. Успешный Login (POST /api/auth/login)**
- Request: `{"username": "admin", "password": "password123"}`
- Response: 200 OK, получены accessToken и refreshToken
- Результат: ✅ Успешно

**2. Login с неверным паролем**
- Request: `{"username": "admin", "password": "wrong"}`
- Response: 401 Unauthorized, "Invalid username or password"
- Результат: ✅ Корректная обработка ошибки

**3. GET /api/users/me с валидным токеном**
- Headers: `Authorization: Bearer <accessToken>`
- Response: 200 OK, данные пользователя (без passwordHash)
- Результат: ✅ Успешно, поле passwordHash скрыто

**4. GET /api/users/me без токена**
- Headers: (без Authorization)
- Response: 401 Unauthorized, "Full authentication is required"
- Результат: ✅ Корректная обработка

**5. GET /api/users (ADMIN успешно)**
- User: admin (ROLE_ADMIN)
- Response: 200 OK, список всех пользователей
- Результат: ✅ Успешно

**6. GET /api/users (MANAGER получает 403)**
- User: manager (ROLE_MANAGER)
- Response: 403 Forbidden, "You don't have permission"
- Результат: ✅ Корректная проверка роли

**7. Refresh Token (POST /api/auth/refresh)**
- Request: `{"refreshToken": "<uuid>"}`
- Response: 200 OK, новый accessToken
- Результат: ✅ Успешно

**8. Logout (POST /api/auth/logout)**
- Request: `{"refreshToken": "<uuid>"}`
- Response: 200 OK, "Logout successful"
- Результат: ✅ Токен удален из БД

**9. Создание пользователя (POST /api/users) - ADMIN**
- Request: CreateUserRequest с валидными данными
- Response: 201 Created, новый пользователь
- Результат: ✅ Успешно

**10. Создание с существующим username**
- Request: username = "admin" (уже существует)
- Response: 400 Bad Request, "Username already exists"
- Результат: ✅ Валидация работает

**11. Admin Reset Password (PUT /api/users/2/reset-password)**
- User: admin
- Request: `{"newPassword": "newPass123"}`
- Response: 200 OK, "Password reset successfully"
- Результат: ✅ Успешно, пользователь может войти с новым паролем

**12. Change Password успешно (PUT /api/users/me/password)**
- Request: `{"currentPassword": "password123", "newPassword": "newPass456"}`
- Response: 200 OK, "Password changed successfully"
- Результат: ✅ Успешно

**13. Change Password с неверным текущим паролем**
- Request: `{"currentPassword": "wrong", "newPassword": "newPass456"}`
- Response: 400 Bad Request, "Current password is incorrect"
- Результат: ✅ Корректная обработка ошибки

### Проверка безопасности

- ✅ **BCrypt хеширование**: Пароли в БД хранятся в виде `$2a$10$...`, невозможно восстановить оригинал
- ✅ **JWT подпись**: Изменение payload токена делает подпись невалидной (403 Forbidden)
- ✅ **Expiration токенов**: Истекший access token возвращает 401 Unauthorized
- ✅ **Refresh token в БД**: После logout refresh token не работает (403 Forbidden)
- ✅ **CORS**: Запросы с других доменов блокируются браузером
- ✅ **@PreAuthorize**: Попытка доступа с недостаточными правами возвращает 403 Forbidden

### Оценка качества кода

Для обеспечения высокого качества разработанного программного обеспечения была проведена работа по изучению метрик качества кода, применимых для оценки проектов на базе Spring Boot и Java. Были изучены теоретические основы различных категорий метрик и определены целевые значения, соответствующие лучшим практикам разработки корпоративных приложений.

#### Выбранные метрики качества кода

**Метрики сложности кода:**
- **Цикломатическая сложность** — целевое значение ≤ 10 для методов, ≤ 20 для классов
- **Когнитивная сложность** — целевое значение ≤ 15 для методов
- **Индекс поддерживаемости** — целевое значение ≥ 70

**Метрики размера кода:**
- Строк в методе: ≤ 50
- Строк в классе: ≤ 500
- Методов в классе: ≤ 20
- Параметров в методе: ≤ 5
- Глубина вложенности: ≤ 4 уровня

**Метрики покрытия тестами:**
- Общее покрытие кода: ≥ 70%
- Покрытие критичных модулей: ≥ 80%
- Покрытие бизнес-логики: ≥ 85%
- Покрытие веток: ≥ 65%

**Метрики дублирования:**
- Процент дублированного кода: ≤ 3%
- Дублированных блоков на 1000 строк: ≤ 5

**Метрики качества архитектуры:**
- Afferent Coupling (Ca): ≤ 10
- Efferent Coupling (Ce): ≤ 10
- Индекс нестабильности: 0.3 - 0.7
- Нарушения принципов SOLID: 0 критических

**Метрики надежности:**
- Критические баги: 0
- Серьезные баги: ≤ 5
- Критические уязвимости: 0
- Высокие уязвимости: 0
- Code Smells на 1000 строк: ≤ 10

#### Инструменты анализа

Для проведения оценки качества кода используются следующие инструменты:

- **SonarQube / SonarCloud** — комплексная платформа для непрерывного контроля качества кода, анализа сложности, обнаружения багов и уязвимостей
- **JaCoCo** — инструмент для измерения покрытия кода тестами (Line Coverage, Branch Coverage, Method Coverage)
- **SpotBugs** — статический анализ для поиска потенциальных багов в Java коде
- **PMD** — анализ исходного кода и обнаружение проблем, дублирования, нарушений стиля
- **Checkstyle** — проверка соответствия кода стандартам кодирования Java
- **JDepend** — анализ зависимостей между пакетами Java, измерение связности и сцепления


---

## **Тестирование**

### Unit-тесты

Покрытие модульными тестами ключевых сервисов: AuthService, AlertService, ReportService

### Интеграционные тесты

Тестирование взаимодействия между компонентами и интеграции с внешними API

---

## **Установка и запуск**

### Развертывание системы

### Подготовка к развертыванию

### Получение исходного кода

Система поставляется в виде исходного кода, размещенного в репозитории Git. Для получения кода необходимо выполнить:

```bash
git clone <https://github.com/Alexey1301/ormSystem.git>
cd ormSystem
```

### Развертывание через Docker

#### Требования к системе

Для Docker развертывания необходимо установить только:

- **Docker** версии 20.10 или выше
- **Docker Compose** версии 2.0 или выше
- Минимум **4 GB RAM**
- Минимум **10 GB** свободного места на диске

**Установка Docker Desktop:**
– Windows/macOS: https://www.docker.com/products/docker-desktop/:
– Linux: «sudo apt-get install docker.io docker-compose».

### Подготовка

### Настройка переменных окружения

#### Через файл `.env`

Создать файл `.env` в корне проекта:

```bash
POSTGRES_PASSWORD=your_secure_password
JWT_SECRET=your-secret-key-here
BACKEND_PORT=8080
FRONTEND_PORT=3000
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:80
REACT_APP_API_URL=http://localhost:8080/api
```

**Генерация JWT секрета:**
```bash
openssl rand -base64 32
```

### Запуск системы

#### Запуск всех сервисов

```bash
docker-compose up -d
```

Эта команда выполняет:
1. Скачивание базовых образов (если их нет):
   - `postgres:15-alpine` (PostgreSQL 15) — готовый официальный образ
   - `maven:3.9-eclipse-temurin-21` (Java 21 + Maven) — для сборки Backend
   - `eclipse-temurin:21-jre-alpine` (Java 21 JRE) — для финального Backend образа
   - `node:20-alpine` (Node.js 20) — для сборки Frontend
   - `nginx:alpine` (Nginx) — для финального Frontend образа

2. Сборку образов (только для Backend и Frontend):
   - **Backend образ** — собирает Spring Boot приложение из `backend/Dockerfile`
   - **Frontend образ** — собирает React приложение из `frontend/Dockerfile`
   - **PostgreSQL** — не требует сборки, используется готовый образ

3. Создание и запуск контейнеров:
   - PostgreSQL контейнер (из готового образа)
   - Backend контейнер (из собранного образа)
   - Frontend контейнер (из собранного образа)

4. Автоматическую инициализацию базы данных:
   - При первом запуске PostgreSQL автоматически выполняет SQL скрипты из `/docker-entrypoint-initdb.d/`
   - Применяется схема из `database/schema.sql`
   - Загружаются тестовые данные из `database/test-data.sql`
   - При последующих запусках скрипты не выполняются (БД уже инициализирована)

#### Проверка статуса

```bash
docker-compose ps
```

Ожидаемый вывод:
```
NAME                  STATUS              PORTS
reputation-backend    Up (healthy)        0.0.0.0:8080->8080/tcp
reputation-db         Up (healthy)        0.0.0.0:5432->5432/tcp
reputation-frontend   Up (healthy)        0.0.0.0:3000->80/tcp
```

#### Просмотр логов

```bash
# Все сервисы
docker-compose logs -f

# Только backend
docker-compose logs -f backend

# Только frontend
docker-compose logs -f frontend
```

### Проверка работоспособности

Подождать 30-60 секунд для полной инициализации всех сервисов.

**Проверка health checks:**
```bash
# Backend
curl http://localhost:8080/api/actuator/health

# Frontend
curl http://localhost:3000/health
```

**Доступ к приложению:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- PostgreSQL: localhost:5432

### Управление контейнерами

#### Остановка

```bash
docker-compose down
```

#### Перезапуск

```bash
docker-compose restart
```

#### Обновление системы

```bash
# Остановка
docker-compose down

# Обновление кода
git pull origin main

# Пересборка и запуск
docker-compose build --no-cache
docker-compose up -d
```

### Резервное копирование

#### Создание бэкапа БД

```bash
docker-compose exec postgres pg_dump -U postgres reputation_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

#### Восстановление из бэкапа

```bash
docker-compose exec -T postgres psql -U postgres -d reputation_db < backup_YYYYMMDD_HHMMSS.sql
```

### Структура Docker файлов

Для развертывания системы через Docker были созданы следующие файлы:

#### `docker-compose.yml` (корневой каталог)

**Назначение:** Главный файл оркестрации всех сервисов системы.

**Функции:**
- Определяет три сервиса: `postgres`, `backend`, `frontend`
- Для `postgres`: использует готовый образ `postgres:15-alpine` (не требует сборки)
- Для `backend`: указывает путь к `backend/Dockerfile` для сборки образа
- Для `frontend`: указывает путь к `frontend/Dockerfile` для сборки образа
- Настраивает сеть `reputation-network` для связи между контейнерами
- Создает именованный volume `postgres_data` для персистентного хранения данных БД
- Настраивает переменные окружения для каждого сервиса
- Определяет зависимости между сервисами (`depends_on`)
- Настраивает health checks для мониторинга состояния контейнеров
- Пробрасывает порты на хост-машину для доступа извне
- Монтирует SQL скрипты в `/docker-entrypoint-initdb.d/` для автоматической инициализации БД

**Ключевые настройки:**
- PostgreSQL: порт 5432, автоматическая инициализация БД
- Backend: порт 8080, ожидает готовности PostgreSQL
- Frontend: порт 3000 (пробрасывается на 80 внутри контейнера), ожидает готовности Backend

#### `backend/Dockerfile`

**Назначение:** Инструкции для сборки Docker образа Backend приложения.

**Структура (многоэтапная сборка):**

**Этап 1 - Сборка:**
- Использует образ `maven:3.9-eclipse-temurin-21` (содержит Java 21 JDK + Maven 3.9)
- Копирует `pom.xml` и загружает зависимости (кэширование для ускорения последующих сборок)
- Копирует исходный код
- Выполняет `mvn clean package` для создания JAR файла

**Этап 2 - Финальный образ:**
- Использует образ `eclipse-temurin:21-jre-alpine` (содержит только Java 21 JRE, минимальный размер)
- Создает непривилегированного пользователя `spring` для безопасности
- Копирует JAR файл из этапа сборки
- Настраивает переменные окружения для JVM (`JAVA_OPTS`)
- Открывает порт 8080
- Настраивает health check для проверки работоспособности
- Запускает приложение через `java -jar app.jar`

#### `frontend/Dockerfile`

**Назначение:** Инструкции для сборки Docker образа Frontend приложения.

**Структура (многоэтапная сборка):**

**Этап 1 - Сборка:**
- Использует образ `node:20-alpine` (содержит Node.js 20 + npm)
- Копирует `package.json` и `package-lock.json`
- Устанавливает зависимости через `npm ci`
- Копирует исходный код React приложения
- Принимает build argument `REACT_APP_API_URL` для настройки API endpoint
- Выполняет `npm run build` для создания статических файлов

**Этап 2 - Финальный образ:**
- Использует образ `nginx:alpine` (содержит Nginx веб-сервер)
- Копирует собранные статические файлы из этапа сборки в `/usr/share/nginx/html`
- Копирует конфигурацию Nginx (`nginx.conf`)
- Открывает порт 80
- Настраивает health check
- Запускает Nginx в foreground режиме

#### PostgreSQL (без Dockerfile)

**Назначение:** База данных PostgreSQL использует готовый официальный образ.

**Механизм автоматической инициализации:**

В `docker-compose.yml` настроено монтирование SQL скриптов:
```yaml
volumes:
  - ./database/schema.sql:/docker-entrypoint-initdb.d/01-schema.sql:ro
  - ./database/test-data.sql:/docker-entrypoint-initdb.d/02-test-data.sql:ro
```

#### `frontend/nginx.conf`

**Назначение:** Конфигурация веб-сервера Nginx для отдачи статических файлов React приложения.

**Основные настройки:**

1. **SPA Routing:**
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```
   - Обеспечивает корректную работу React Router
   - Все запросы, не соответствующие файлам, перенаправляются на `index.html`

2. **Gzip сжатие:**
   - Включает сжатие для уменьшения размера передаваемых данных
   - Поддерживает сжатие для текстовых файлов, CSS, JavaScript, JSON

3. **Кэширование статических ресурсов:**
   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```
   - Кэширует статические файлы на 1 год
   - Улучшает производительность при повторных посещениях

4. **Security headers:**
   - `X-Frame-Options: SAMEORIGIN` — защита от clickjacking
   - `X-Content-Type-Options: nosniff` — предотвращение MIME-sniffing
   - `X-XSS-Protection: 1; mode=block` — защита от XSS атак

5. **Health check endpoint:**
   ```nginx
   location /health {
       return 200 "healthy\n";
   }
   ```
   - Используется Docker для проверки работоспособности контейнера

**Процесс сборки:**

1. `docker-compose.yml` читается Docker Compose
2. Для `backend` сервиса:
   - Читается `backend/Dockerfile`
   - Применяется `backend/.dockerignore`
   - Собирается образ с Spring Boot приложением (многоэтапная сборка)
3. Для `frontend` сервиса:
   - Читается `frontend/Dockerfile`
   - Применяется `frontend/.dockerignore`
   - Копируется `frontend/nginx.conf`
   - Собирается образ с React приложением и Nginx (многоэтапная сборка)
4. Для `postgres` сервиса:
   - **Не требуется сборка образа** — используется готовый официальный образ `postgres:15-alpine`
   - Образ скачивается из Docker Hub (если его еще нет локально)
   - Монтируются SQL скрипты (`database/schema.sql` и `database/test-data.sql`) в `/docker-entrypoint-initdb.d/`
   - При первом запуске PostgreSQL автоматически выполняет эти скрипты для инициализации БД


---

## **Лицензия**

Этот проект лицензирован по лицензии MIT - подробности представлены в файле LICENSE.md

---

## **Контакты**

Автор: [Короткевич Алескей Дмитриевич]  

