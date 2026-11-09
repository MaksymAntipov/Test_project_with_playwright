1. Для запуска проект используется команда:

npx playwright test - все тесты

npx playwright test tests/Checkout.spec.ts - конкретный тест

npx playwright test Checkout - все файлы, в пути которых есть Checkout

npx playwright test --project=setup - только setup для обновления storageState

npx playwright test --project=chromium - весь проект chromium, setup подтянется как зависимость

npx playwright test --no-deps - без зависимостей

ENV=stage npx playwright test - с выбором окружения

--headed - видимый браузер

--debug - пошаговое выполнение, пауза на каждом шаге

--ui - юай мод

--repeat-each=10 - прогнать тесты 10 раз чтобы проверить на флаки

--workers=1 - без параллелизации

--list - показать какие тесты будут запущены без запуска

npx playwright show-report - отчет последнего прогона

2. В playwright.config.js сущесвует проект chromium с кастомным вью портом, так же зависимостью от проекта setup, последий запускается перед проектом chromium для формирования снимка storageState;
3. В проекте setup указана маска **/*.setup.ts, который запускается для сохранения storageState;
4. Так же в playwright.config.js указан путь к файлу для импорта урлов переменных окружения для запуска тестов;
5. В тестах, в папке tests/setup лежит тест для формирования снимка storageState;
6. В папке helpers лежат тестовые данные;
7. В папке config лежат конфигурационные параметры, константы - auth.ts - путь для файла со снимком storageState, config/env.ts - переменные окружений;
8. В папке .states лежит сам снимок storageState - файл генерируется автоматически при запуске зависимых проектов, вся папка добавлена в гит игнор;
9. В папке POM реализован app manager, это класс, в котором созданы экземпляры для всех page objects и компонентов и хранит их в своих полях
10. В папке fixtures реализована фикстура app в файле pages.ts, она создает экземпляр класса App и позволяет без лишнего ипорта использовать POM обьекты с удобной навигацией. Для расширения новыми POM достаточно всего лишь в app manager добавить новую модель.
11. fixtures/pages.ts экспортирует расширенный test (с фикстурой app) и реэкспортирует expect из @playwright/test. Поэтому спеки импортируют оба из одного места: import { test, expect } from '../fixtures/pages'. test обязательно брать отсюда, иначе фикстуры app не будет. expect берётся отсюда для удобства, это тот же объект Playwright.
