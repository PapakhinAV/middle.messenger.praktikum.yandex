Это учебный проект "Мессенджер" в рамках курса "Мидл фронтенд-разработчик" от Яндекс Практикум.

Материалы к проекту:
* Макеты - https://www.figma.com/file/7Rjcrw0K0COnHIe1hVTh53/messenger?node-id=31904-3&t=6L1knd0Aj7VhzH3t-0
* Netlify - https://deploy--bucolic-sfogliatella-493bcb.netlify.app/

Комадны для запуска:
* `yarn start` - выполнит сборку проекта, а после поднимет  express-сервер на 3000 порту.
* `yarn build` - очистит папку dist и соберёт проект заново.
* `yarn dev` - parcel соберёт проект и откроет его на порту 1234 в watch режиме.
* `yarn` - установка зависимостей.
* `yarn lint` - запуск статического анализа (eslint) для typesctipt.
* `yarn lint:fix` - запуск статического анализа и автоматического исправления ошибок (eslint) для typesctipt.
* `yarn stylelint` - запуск статического анализа (stylelint) для файлов со стилями.
* `yarn stylelint:fix` - запуск статического анализа и автоматического исправления ошибок (stylelint) для файлов со стилями.

Используемые технологии:
* Шаблонизатор - Handlebars;
* Сервер - Express;
* Сборщик - Parcel;
* Типизация - TypeScript;
* Статический анализ - Stylelint, ESLint;
* Работа с API - на базе XMLHttpRequest;
* Роутинг - на базе HistoryAPI;
* Обмен сообщениями - WebSocket;


Версии:
1. В первом спринте реализована большая часть вёрстки с использованием Handlebars, настроен сборщик Parcel, настроен Express сервер, а также настроен деплой на Netlify.
2. В рамках второго спринта изменена логика работы Handlebars (компиляция переехана на клиент), в проект внедрён Typescript, ESLint, Stylelint, созданы формы для ввода данных, а также реализована валидация. При реализации компонентов использовался паретн EventBus. Дополнительно реализован класс HTTPTransport, основанный на XMLHttpRequest, для обращения к серверу. 
3. В рамках третьего спринта добавлен кастомный роутер (на основе HistoryAPI), подключены и настроены API, для авторизации/регистрации/редактирования профиля, отправки/получения сообщений (Web Socket), создания/удаления чатов. Созданы контроллеры, для работы с АПИ. Реализован функционал для предотвращения XSS и DoS угроз.

