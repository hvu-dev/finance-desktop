# Personal financial manager

Manage your daily expense with a self-contained application and no need for internet connection. If you own an application, it's all yours.

-   No hidden data collection
-   No payment required
-   No closed-source

## Tech stack

-   NodeJS: v22.14.0
-   ElectronJS: v35.0.0
-   ReactJS: v18
-   Ant Design: v5
-   SQLite3 (with `better-sqlite3` v11)
-   Electron-Vite: v3

## Development

If you want to develop some features yourself and use for your own good, that's great because this application is easy to setup (at least for development):

1. Install NodeJS (preferred v22): we didn't have a chance to test other popular JavaScript run-times like `Bun` or `Deno`. But if it worked for you, let us know!
2. Run `npm install`
3. Run `npm start`
4. Build your application `npm run build:<your platform>` (see more in `package.json` file)

Currently, the build for MacOS (ARM) is working pretty good.

## Testing

This project is currently lack of the presence tests. Although it's very important part and will be implemented (soon), at the moment, features are having a higher priority.

## Features

All the features listed below are planned, and will be implemented soon:

1. Expenses

-   Manage your expenses

2. Statistics

-   Common statistics numbers, overview about your spendings

3. Budget

-   Manage your budget
-   Manage your saving goals

4. Settings

We are pleased to take any additional recommendations, you can simply open an issue and we will take them into consideration (seriously).

## Note:

This application is in active development. Breaking changes are expected.
