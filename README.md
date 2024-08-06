<div align="center">
    <h1 align="center">Automation project using Playwright</h1>
</div>
<hr>

Welcome to my repository! ;)

Here you will find a ready to use test automation project using Typescript and Playwright. I also try to build a complete pipeline that performs ui, mobile, api, accessibility, performance and security testing.

## ⚡ Setup

- Install project dependencies `npm install --silent`.
- Install `k6`, [here](https://grafana.com/docs/k6/latest/set-up/install-k6/) is the official documentation.

## 🚀 Documentation
### Project Structure
- **`tests`**: All test cases. Test cases are divided into two categories: `functional` (UI test cases) and `non-functional` (api, performance, accessibility and security test cases).


### Test Stages in Pipeline

There are three stages right now:
- **Playwright-Test**: Here all playwright test cases will run, by default is set to `regression`.
- **Fuzzy-Api-Test**:  `schemathesis` is used to perform fuzzy api testing, it needs the api schema to run the test. By default a test schema is used.
- **Performance-Test**: `k6` is used to run performance test, all related test cases are placed inside `tests/non-functional/performance/` directory.

## 🤖 Tech stack
- [Typescript](https://www.typescriptlang.org/) as the programing language.
- [Playwright](https://playwright.dev/) as the automation framework.
- [allure-js](https://github.com/allure-framework/allure-js/blob/main/packages/allure-playwright/README.md) reporter for playwright.
- [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/README.md) to assist in injecting, configuring, and analyzing axe with Playwright.
- [schemathesis](https://github.com/schemathesis/schemathesis) used to perform fuzzy api test.
- [k6](https://k6.io/docs/) used to perform performance test.

## 📜 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.