Это учебный проект "Мессенджер" в рамках курса "Мидл фронтенд-разработчик" от Яндекс Практикум.

Материалы к проекту:
* Макеты - https://www.figma.com/file/7Rjcrw0K0COnHIe1hVTh53/messenger?node-id=31904-3&t=6L1knd0Aj7VhzH3t-0
* Netlify - https://deploy--bucolic-sfogliatella-493bcb.netlify.app/
* Heroku - https://papakhin-messenger-78d6ad550a43.herokuapp.com/messenger

Комадны для запуска:
* `yarn start` - выполнит сборку проекта, а после поднимет  express-сервер на 3000 порту.
* `yarn build` - очистит папку dist и соберёт проект заново.
* `yarn dev` - parcel соберёт проект и откроет его на порту 1234 в watch режиме.
* `yarn` - установка зависимостей.
* `yarn lint` - запуск статического анализа (eslint) для typesctipt.
* `yarn lint:fix` - запуск статического анализа и автоматического исправления ошибок (eslint) для typesctipt.
* `yarn stylelint` - запуск статического анализа (stylelint) для файлов со стилями.
* `yarn stylelint:fix` - запуск статического анализа и автоматического исправления ошибок (stylelint) для файлов со стилями.
* `yarn test` - запуск тестов.

Используемые технологии:
* Шаблонизатор - Handlebars;
* Сервер - Express;
* Сборщик - Webpack;
* Типизация - TypeScript;
* Статический анализ - Stylelint, ESLint;
* Работа с API - на базе XMLHttpRequest;
* Роутинг - на базе HistoryAPI;
* Обмен сообщениями - WebSocket;
* Тестирование - Mocha, Chai, Sinon, Proxyquire;


Версии:
1. В первом спринте реализована большая часть вёрстки с использованием Handlebars, настроен сборщик Parcel, настроен Express сервер, а также настроен деплой на Netlify.
2. В рамках второго спринта изменена логика работы Handlebars (компиляция переехана на клиент), в проект внедрён Typescript, ESLint, Stylelint, созданы формы для ввода данных, а также реализована валидация. При реализации компонентов использовался паретн EventBus. Дополнительно реализован класс HTTPTransport, основанный на XMLHttpRequest, для обращения к серверу. 
3. В рамках третьего спринта добавлен кастомный роутер (на основе HistoryAPI), подключены и настроены API, для авторизации/регистрации/редактирования профиля, отправки/получения сообщений (Web Socket), создания/удаления чатов. Созданы контроллеры, для работы с АПИ. Реализован функционал для предотвращения XSS и DoS угроз.
4. В рамках четвёртого спринта Parcel заменён на Webpack, настроен прекомит, реализованы тесты и сборка Docker Image, а также проведён аудит пакетов.

## Деплой на Heroku

Перед тем как начать, убедитесь, что вы установили [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) и [Docker](https://docs.docker.com/get-docker/). Также вам понадобится аккаунт на [Heroku](https://id.heroku.com/login) и [Docker Hub](https://hub.docker.com/).

### Шаги для деплоя:

1. Залогиньтесь в Heroku CLI:

    ```
    heroku login
    ```

2. Залогиньтесь в Docker CLI:

    ```
    docker login
    ```

3. Соберите Docker образ:

    ```
    docker build -t messanger .
    ```

4. Загрузите Docker образ на Heroku:

    ```
    heroku container:push web
    ```

5. Опубликуйте Docker образ на Heroku:

    ```
    heroku container:release web
    ```

6. Запустите ваше приложение на Heroku:

    ```
    heroku ps:scale web=1
    ```
