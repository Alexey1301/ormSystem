# Описание схемы базы данных системы управления репутацией

## Обзор

База данных спроектирована для PostgreSQL 14+ и содержит 10 основных таблиц для управления репутацией компаний через отзывы с различных платформ, включая систему аутентификации пользователей.

---

## Таблицы базы данных

### 1. company (Компании)

Хранит информацию о компаниях, использующих систему.

| Атрибут | Тип данных | Описание |
|---------|------------|----------|
| id | BIGSERIAL | Уникальный идентификатор (PK) |
| name | VARCHAR(200) | Название компании |
| description | TEXT | Описание деятельности |
| industry | VARCHAR(100) | Отрасль деятельности |
| website | VARCHAR(255) | Веб-сайт компании |
| is_active | BOOLEAN | Статус активности |
| created_at | TIMESTAMP | Дата создания записи |
| updated_at | TIMESTAMP | Дата последнего обновления |

---

### 2. user (Пользователи)

Пользователи системы с различными ролями доступа.

| Атрибут | Тип данных | Описание |
|---------|------------|----------|
| id | BIGSERIAL | Уникальный идентификатор (PK) |
| username | VARCHAR(50) | Имя пользователя (уникальное) |
| email | VARCHAR(100) | Email (уникальный) |
| password_hash | VARCHAR(255) | Хэш пароля |
| full_name | VARCHAR(100) | Полное имя |
| role | user_role | Роль (ADMIN, MANAGER, MODERATOR, SPECIALIST) |
| company_id | BIGINT | ID компании (FK → company.id) |
| is_active | BOOLEAN | Статус активности |
| created_at | TIMESTAMP | Дата создания учетной записи |
| last_login | TIMESTAMP | Дата последнего входа |

**Связи:**
- `company_id` → `company(id)` ON DELETE SET NULL

---

### 3. source (Источники отзывов)

Источники сбора отзывов (Яндекс, Google, 2GIS).

| Атрибут | Тип данных | Описание |
|---------|------------|----------|
| id | BIGSERIAL | Уникальный идентификатор (PK) |
| company_id | BIGINT | ID компании (FK → company.id) |
| platform | platform_type | Платформа (YANDEX, GOOGLE, TWOGIS) |
| name | VARCHAR(200) | Название источника |
| url | VARCHAR(500) | URL источника |
| api_key | VARCHAR(255) | API ключ для доступа |
| is_active | BOOLEAN | Статус активности |
| last_collection | TIMESTAMP | Дата последнего сбора данных |
| created_at | TIMESTAMP | Дата создания источника |

**Связи:**
- `company_id` → `company(id)` ON DELETE CASCADE

---

### 4. review (Отзывы)

Собранные отзывы из различных источников.

| Атрибут | Тип данных | Описание |
|---------|------------|----------|
| id | BIGSERIAL | Уникальный идентификатор (PK) |
| source_id | BIGINT | ID источника (FK → source.id) |
| external_id | VARCHAR(255) | ID отзыва на внешней платформе |
| author | VARCHAR(200) | Автор отзыва |
| rating | DECIMAL(2,1) | Оценка от 1.0 до 5.0 |
| text | TEXT | Текст отзыва |
| published_at | TIMESTAMP | Дата публикации на платформе |
| collected_at | TIMESTAMP | Дата сбора системой |
| sentiment | sentiment_type | Тональность (POSITIVE, NEUTRAL, NEGATIVE) |
| created_at | TIMESTAMP | Дата создания записи |

**Связи:**
- `source_id` → `source(id)` ON DELETE CASCADE

**Ограничения:**
- `rating` между 1.0 и 5.0
- `UNIQUE(source_id, external_id)` - предотвращает дубликаты

---

### 5. task (Задачи)

Задачи по обработке отзывов для специалистов.

| Атрибут | Тип данных | Описание |
|---------|------------|----------|
| id | BIGSERIAL | Уникальный идентификатор (PK) |
| review_id | BIGINT | ID отзыва (FK → review.id) |
| assigned_to | BIGINT | ID назначенного специалиста (FK → user.id) |
| status | task_status | Статус задачи |
| priority | task_priority | Приоритет задачи |
| deadline | TIMESTAMP | Срок выполнения |
| created_at | TIMESTAMP | Дата создания |
| updated_at | TIMESTAMP | Дата обновления |
| completed_at | TIMESTAMP | Дата завершения |

**Статусы (task_status):**
- NEW - Новая
- IN_PROGRESS - В работе
- PENDING_REVIEW - На проверке
- COMPLETED - Завершена
- CANCELLED - Отменена

**Приоритеты (task_priority):**
- LOW - Низкий
- MEDIUM - Средний (по умолчанию)
- HIGH - Высокий
- URGENT - Срочный

**Связи:**
- `review_id` → `review(id)` ON DELETE CASCADE
- `assigned_to` → `user(id)` ON DELETE SET NULL

---

### 6. response (Ответы на отзывы)

Ответы, подготовленные специалистами на отзывы.

| Атрибут | Тип данных | Описание |
|---------|------------|----------|
| id | BIGSERIAL | Уникальный идентификатор (PK) |
| task_id | BIGINT | ID задачи (FK → task.id) |
| review_id | BIGINT | ID отзыва (FK → review.id) |
| user_id | BIGINT | ID автора ответа (FK → user.id) |
| text | TEXT | Текст ответа |
| recorded_at | TIMESTAMP | Дата записи в системе |
| published_at | TIMESTAMP | Дата публикации на платформе |
| is_published | BOOLEAN | Статус публикации |
| created_at | TIMESTAMP | Дата создания записи |

**Связи:**
- `task_id` → `task(id)` ON DELETE CASCADE
- `review_id` → `review(id)` ON DELETE CASCADE
- `user_id` → `user(id)` ON DELETE SET NULL

---

### 7. comment (Комментарии к задачам)

Внутренние комментарии модераторов и специалистов к задачам.

| Атрибут | Тип данных | Описание |
|---------|------------|----------|
| id | BIGSERIAL | Уникальный идентификатор (PK) |
| task_id | BIGINT | ID задачи (FK → task.id) |
| user_id | BIGINT | ID автора (FK → user.id) |
| text | TEXT | Текст комментария |
| created_at | TIMESTAMP | Дата создания |

**Связи:**
- `task_id` → `task(id)` ON DELETE CASCADE
- `user_id` → `user(id)` ON DELETE SET NULL

---

### 8. report (Отчеты)

Сгенерированные отчеты по работе с отзывами.

| Атрибут | Тип данных | Описание |
|---------|------------|----------|
| id | BIGSERIAL | Уникальный идентификатор (PK) |
| company_id | BIGINT | ID компании (FK → company.id) |
| created_by | BIGINT | ID создателя (FK → user.id) |
| type | report_type | Тип отчета |
| period_start | TIMESTAMP | Начало периода |
| period_end | TIMESTAMP | Конец периода |
| format | report_format | Формат файла |
| file_path | VARCHAR(500) | Путь к файлу отчета |
| parameters | JSONB | Параметры генерации (JSON) |
| created_at | TIMESTAMP | Дата создания |

**Типы отчетов (report_type):**
- SUMMARY - Сводный отчет
- DETAILED - Детальный отчет
- ANALYTICS - Аналитический отчет

**Форматы (report_format):**
- PDF - PDF документ
- EXCEL - Excel таблица
- CSV - CSV файл

**Связи:**
- `company_id` → `company(id)` ON DELETE CASCADE
- `created_by` → `user(id)` ON DELETE SET NULL

---

### 9. activity_log (Журнал активности специалистов)

Журнал действий специалистов при работе с задачами.

| Атрибут | Тип данных | Описание |
|---------|------------|----------|
| id | BIGSERIAL | Уникальный идентификатор (PK) |
| specialist_id | BIGINT | ID специалиста (FK → user.id) |
| task_id | BIGINT | ID задачи (FK → task.id) |
| action | VARCHAR(50) | Действие (STARTED, UPDATED, COMPLETED) |
| details | JSONB | Детали действия (JSON) |
| created_at | TIMESTAMP | Дата и время действия |

**Связи:**
- `specialist_id` → `user(id)` ON DELETE CASCADE
- `task_id` → `task(id)` ON DELETE CASCADE

---

### 10. refresh_token (Refresh токены для JWT аутентификации)

Хранение refresh токенов для механизма обновления JWT токенов.

| Атрибут | Тип данных | Описание |
|---------|------------|----------|
| id | BIGSERIAL | Уникальный идентификатор (PK) |
| user_id | BIGINT | ID пользователя (FK → user.id) |
| token | VARCHAR(500) | UUID токен (уникальный) |
| expiry_date | TIMESTAMP | Дата истечения токена |
| created_at | TIMESTAMP | Дата создания токена |

**Связи:**
- `user_id` → `user(id)` ON DELETE CASCADE

**Описание:**
Таблица используется для реализации механизма refresh токенов в системе JWT аутентификации:
- Access токен живет 15 минут
- Refresh токен живет 7 дней и хранится в БД
- При logout refresh токен удаляется из БД
- Позволяет отслеживать активные сессии пользователей

---

## ENUM типы

### user_role
Роли пользователей в системе:
- **ADMIN** - Администратор системы
- **MANAGER** - Менеджер компании
- **MODERATOR** - Модератор отзывов
- **SPECIALIST** - Специалист поддержки

### platform_type
Платформы источников отзывов:
- **YANDEX** - Яндекс.Карты
- **GOOGLE** - Google Maps
- **TWOGIS** - 2ГИС

### sentiment_type
Тональность отзыва:
- **POSITIVE** - Положительный
- **NEUTRAL** - Нейтральный
- **NEGATIVE** - Отрицательный

### task_status
Статусы задач (см. таблицу task)

### task_priority
Приоритеты задач (см. таблицу task)

### report_type
Типы отчетов (см. таблицу report)

### report_format
Форматы отчетов (см. таблицу report)

---

## Диаграмма связей

```
company (1) ──→ (N) user ──→ (N) refresh_token (JWT токены)
        (1) ──→ (N) source ──→ (N) review ──→ (N) task ──→ (N) response
        (1) ──→ (N) report                   │           │
                                              ↓           ↓
user (1) ──────────────────────────→ (N) task ──→ (N) comment
     (1) ──────────────────────────→ (N) response
     (1) ──────────────────────────→ (N) comment
     (1) ──────────────────────────→ (N) report
     (1) ──────────────────────────→ (N) activity_log
                                              ↑
task (1) ─────────────────────────→ (N) activity_log
```

---

## Политики удаления

### CASCADE (каскадное удаление)
При удалении родительской записи автоматически удаляются все связанные дочерние:
- company → source
- source → review
- review → task
- task → response, comment, activity_log
- user → activity_log, refresh_token

### SET NULL
При удалении родительской записи внешний ключ устанавливается в NULL:
- company → user
- user → task (assigned_to)
- user → response, comment, report

---

## Индексы и оптимизация

Для оптимизации производительности рекомендуется создать индексы на:
- Внешние ключи (автоматически при создании FK)
- Поля для частого поиска (email, username, status, platform)
- Временные поля для сортировки (created_at, published_at)

---

## Нормализация

База данных спроектирована в **третьей нормальной форме (3NF)**:
- ✅ Устранены транзитивные зависимости
- ✅ Каждый атрибут зависит от первичного ключа
- ✅ Нет дублирования данных
- ✅ Использование ENUM типов для ограничения значений
- ✅ Использование JSONB для гибкого хранения параметров

---

## Установка

```bash
# Создание базы данных
createdb reputation_db

# Применение схемы
psql -U postgres -d reputation_db -f schema.sql

# Проверка созданных таблиц
psql -U postgres -d reputation_db -c "\dt"
```


