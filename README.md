# Chat App

## 🏃‍♂️ Simple Start

To develop this chat i use expo and expo-go installed on my phone.

## Backend Repo

-   Clone the server repo

    ```
    git clone
    ```

-   Run the backend

    ```
    npm run server
    ```

## Frontend Repo

1. Clone the repository, run command:

    ```
    git clone
    ```

2. Install dependencies with `npm install` command at the root of the project

    ```
    npm install
    ```

3. Start project with command **`npm run start`**

    ```
    npm run start
    ```

4. To connect this project to the backend change **IP_V4** constant in **src/config.ts** file to your nettwork address.

5. You can Logi In to app with username: **Ivan**, password: **1234**

## 🥊 Code quality

-   [husky](https://typicode.github.io/husky/) — a tool that lets you easily manage git hooks;
-   [lint-staged](https://www.npmjs.com/package/lint-staged) — run linters on git staged files;
-   [commitlint](https://commitlint.js.org/) — helps your team adhere to a commit convention;
-   [prettier](https://prettier.io/) — an opinionated code formatter;
-   [eslint](https://eslint.org/) — find problems in your JS/TS code;
-   [editorconfig](https://editorconfig.org/) — rewrite ide rules.

## 🗂 Commit convention

-   `feat: new feature`;
-   `fix(scope): bug in scope`;
-   `feat!: breaking change` / `feat(scope)!: rework API`;
-   `chore(deps): update dependencies`.

### Commit types

-   `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm);
-   `ci`: Changes to CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs);
-   **`chore`: Changes which doesn't change source code or tests e.g. changes to the build process, auxiliary tools, libraries**;
-   `docs`: Documentation only changes;
-   **`feat`: A new feature**;
-   **`fix`: A bug fix**;
-   `perf`: A code change that improves performance;
-   `refactor`: A code change that neither fixes a bug nor adds a feature;
-   `revert`: Revert something;
-   `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, styles etc).

## ⚙️ Scripts

-   `lint` - run eslint to check your code;
-   `prettier` - run prettier on all project files;
-   `lint:fix` - run eslint with **--fix** flag.

## Husky flow

1. pre-push - `npm run lint`;
2. pre-commit - `npx lint-staged` that include commands `lint:fix` && `prettier`;
3. commit-msg - read `Commit convetion` section.
