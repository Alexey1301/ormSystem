-- ================================================
-- СИСТЕМА УПРАВЛЕНИЯ РЕПУТАЦИЕЙ КОМПАНИИ
-- SQL-скрипт создания базы данных
-- СУБД: PostgreSQL 14+
-- ================================================

-- Удаление существующих таблиц (если есть)
DROP TABLE IF EXISTS refresh_token CASCADE;
DROP TABLE IF EXISTS activity_log CASCADE;
DROP TABLE IF EXISTS report CASCADE;
DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS response CASCADE;
DROP TABLE IF EXISTS task CASCADE;
DROP TABLE IF EXISTS review CASCADE;
DROP TABLE IF EXISTS source CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS company CASCADE;

-- Удаление типов ENUM (если есть)
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS platform_type CASCADE;
DROP TYPE IF EXISTS sentiment_type CASCADE;
DROP TYPE IF EXISTS task_status CASCADE;
DROP TYPE IF EXISTS task_priority CASCADE;
DROP TYPE IF EXISTS report_type CASCADE;
DROP TYPE IF EXISTS report_format CASCADE;

-- ================================================
-- СОЗДАНИЕ ТИПОВ ENUM
-- ================================================

CREATE TYPE user_role AS ENUM ('ADMIN', 'MANAGER', 'MODERATOR', 'SPECIALIST');
CREATE TYPE platform_type AS ENUM ('YANDEX', 'GOOGLE', 'TWOGIS');
CREATE TYPE sentiment_type AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');
CREATE TYPE task_status AS ENUM ('NEW', 'IN_PROGRESS', 'PENDING_REVIEW', 'COMPLETED', 'CANCELLED');
CREATE TYPE task_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE report_type AS ENUM ('SUMMARY', 'DETAILED', 'ANALYTICS');
CREATE TYPE report_format AS ENUM ('PDF', 'EXCEL', 'CSV');

-- ================================================
-- СОЗДАНИЕ ТАБЛИЦ
-- ================================================

-- Таблица: Компании
CREATE TABLE company (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    industry VARCHAR(100),
    website VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Таблица: Пользователи
CREATE TABLE "user" (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role user_role NOT NULL,
    company_id BIGINT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
    CONSTRAINT fk_user_company FOREIGN KEY (company_id) 
        REFERENCES company(id) ON DELETE SET NULL
);

-- Таблица: Источники отзывов
CREATE TABLE source (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL,
    platform platform_type NOT NULL,
    name VARCHAR(200) NOT NULL,
    url VARCHAR(500),
    api_key VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    last_collection TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_source_company FOREIGN KEY (company_id) 
        REFERENCES company(id) ON DELETE CASCADE
);

-- Таблица: Отзывы
CREATE TABLE review (
    id BIGSERIAL PRIMARY KEY,
    source_id BIGINT NOT NULL,
    external_id VARCHAR(255),
    author VARCHAR(200),
    rating DECIMAL(2,1) CHECK (rating >= 1.0 AND rating <= 5.0),
    text TEXT,
    published_at TIMESTAMP,
    collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    sentiment sentiment_type,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_review_source FOREIGN KEY (source_id) 
        REFERENCES source(id) ON DELETE CASCADE,
    CONSTRAINT uq_review_external UNIQUE (source_id, external_id)
);

-- Таблица: Задачи
CREATE TABLE task (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT NOT NULL,
    assigned_to BIGINT,
    status task_status DEFAULT 'NEW' NOT NULL,
    priority task_priority DEFAULT 'MEDIUM' NOT NULL,
    deadline TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    completed_at TIMESTAMP,
    CONSTRAINT fk_task_review FOREIGN KEY (review_id) 
        REFERENCES review(id) ON DELETE CASCADE,
    CONSTRAINT fk_task_assigned FOREIGN KEY (assigned_to) 
        REFERENCES "user"(id) ON DELETE SET NULL
);

-- Таблица: Ответы на отзывы
CREATE TABLE response (
    id BIGSERIAL PRIMARY KEY,
    task_id BIGINT NOT NULL,
    review_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    text TEXT NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    published_at TIMESTAMP,
    is_published BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_response_task FOREIGN KEY (task_id) 
        REFERENCES task(id) ON DELETE CASCADE,
    CONSTRAINT fk_response_review FOREIGN KEY (review_id) 
        REFERENCES review(id) ON DELETE CASCADE,
    CONSTRAINT fk_response_user FOREIGN KEY (user_id) 
        REFERENCES "user"(id) ON DELETE SET NULL
);

-- Таблица: Комментарии к задачам
CREATE TABLE comment (
    id BIGSERIAL PRIMARY KEY,
    task_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_comment_task FOREIGN KEY (task_id) 
        REFERENCES task(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_user FOREIGN KEY (user_id) 
        REFERENCES "user"(id) ON DELETE SET NULL
);

-- Таблица: Отчеты
CREATE TABLE report (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL,
    created_by BIGINT NOT NULL,
    type report_type NOT NULL,
    period_start TIMESTAMP NOT NULL,
    period_end TIMESTAMP NOT NULL,
    format report_format NOT NULL,
    file_path VARCHAR(500),
    parameters JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_report_company FOREIGN KEY (company_id) 
        REFERENCES company(id) ON DELETE CASCADE,
    CONSTRAINT fk_report_user FOREIGN KEY (created_by) 
        REFERENCES "user"(id) ON DELETE SET NULL
);

-- Таблица: Журнал активности специалистов
CREATE TABLE activity_log (
    id BIGSERIAL PRIMARY KEY,
    specialist_id BIGINT NOT NULL,
    task_id BIGINT NOT NULL,
    action VARCHAR(50) NOT NULL,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_activity_log_specialist FOREIGN KEY (specialist_id) 
        REFERENCES "user"(id) ON DELETE CASCADE,
    CONSTRAINT fk_activity_log_task FOREIGN KEY (task_id) 
        REFERENCES task(id) ON DELETE CASCADE
);

-- Таблица: Refresh токены для JWT аутентификации
CREATE TABLE refresh_token (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token VARCHAR(500) UNIQUE NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_refresh_token_user FOREIGN KEY (user_id) 
        REFERENCES "user"(id) ON DELETE CASCADE
);

-- ================================================
-- КОММЕНТАРИИ К ТАБЛИЦАМ
-- ================================================

COMMENT ON TABLE company IS 'Компании, использующие систему';
COMMENT ON TABLE "user" IS 'Пользователи системы с различными ролями';
COMMENT ON TABLE source IS 'Источники отзывов (Яндекс, Google, 2GIS)';
COMMENT ON TABLE review IS 'Собранные отзывы из различных источников';
COMMENT ON TABLE task IS 'Задачи по работе с отзывами';
COMMENT ON TABLE response IS 'Ответы на отзывы';
COMMENT ON TABLE comment IS 'Комментарии к задачам';
COMMENT ON TABLE report IS 'Сгенерированные отчеты';
COMMENT ON TABLE activity_log IS 'Журнал активности специалистов';
COMMENT ON TABLE refresh_token IS 'Refresh токены для JWT аутентификации';

