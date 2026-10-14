1. В playwright.config.js сущесвует проект chromium с кастомным вью портом, так же зависимостью от проекта setup, последий запускается перед проектом chromium для формирования снимка storageState;
2. В проекте setup указана маска **/*.setup.ts, который запускается для сохранения storageState;
3. Так же в playwright.config.js указан путь к файлу для импорта урлов переменных окружения для запуска тестов;
4. В тестах, в папке tests/setup лежит тест для формирования снимка storageState;
5. В папке helpers лежат тестовые данные;
6. В папке config лежат конфигурационные параметры, константы - auth.ts - путь для файла со снимком storageState, config/env.ts - переменные окружений;
7. В папке .states лежит сам снимок storageState - файл генерируется автоматически при запуске зависимых проектов, вся папка добавлена в гит игнор;
8. Для запуска проект используется команда:

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


