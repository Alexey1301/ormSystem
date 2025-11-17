-- ================================================
-- ТЕСТОВЫЕ ДАННЫЕ
-- Для разработки и тестирования системы
-- ================================================

-- Создание реальной компании для тестирования
INSERT INTO company (name, description, industry, website) 
VALUES (
    'ООО "ТехноСервис"', 
    'Компания по предоставлению IT-услуг и технической поддержки. Специализируется на обслуживании корпоративных клиентов и разработке программных решений.', 
    'Информационные технологии', 
    'https://www.technoserv.ru'
);

-- Создание тестовых пользователей
-- Пароль для всех: password123
-- BCrypt хэш: $2a$10$hHsF9JKvJwr/0KoeeQQRLOf0IvcFpvGylGbsBBO2omkjjG2VVGqU.

INSERT INTO "user" (username, email, password_hash, full_name, role, company_id, is_active) 
VALUES 
    ('admin', 'admin@example.com', '$2a$10$hHsF9JKvJwr/0KoeeQQRLOf0IvcFpvGylGbsBBO2omkjjG2VVGqU.', 'Администратор Системы', 'ADMIN', 1, true),
    ('manager', 'manager@example.com', '$2a$10$hHsF9JKvJwr/0KoeeQQRLOf0IvcFpvGylGbsBBO2omkjjG2VVGqU.', 'Менеджер Компании', 'MANAGER', 1, true),
    ('moderator', 'moderator@example.com', '$2a$10$hHsF9JKvJwr/0KoeeQQRLOf0IvcFpvGylGbsBBO2omkjjG2VVGqU.', 'Модератор Отзывов', 'MODERATOR', 1, true),
    ('specialist', 'specialist@example.com', '$2a$10$hHsF9JKvJwr/0KoeeQQRLOf0IvcFpvGylGbsBBO2omkjjG2VVGqU.', 'Специалист Поддержки', 'SPECIALIST', 1, true);

-- Вывод созданных пользователей
SELECT 
    'Тестовые пользователи созданы!' as status,
    COUNT(*) as users_created
FROM "user";

-- Учетные данные для входа:
-- Username: admin,     Password: password123 (ADMIN)
-- Username: manager,   Password: password123 (MANAGER)
-- Username: moderator, Password: password123 (MODERATOR)
-- Username: specialist,Password: password123 (SPECIALIST)

