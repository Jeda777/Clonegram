<br/>
<p align="center">
  <h1 align="center">Clonegram</h3>

  <p align="center">
    This project is clone of instagram.
    <br/>
    <br/>
    <a href="https://clonegram-et5j.onrender.com">View Demo</a>
    .
    <a href="https://github.com/Jeda777/Clonegram/issues">Report Bug</a>
  </p>
</p>

## :notebook_with_decorative_cover: Table Of Contents

- [About the Project](#about-the-project)
  - [Screenshots](#screenshots)
  - [Demo Accounts](#demo-accounts)
  - [Features](#features)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone The Repository](#clone-the-repository)
  - [Environment Variables](#environment-variables)
  - [Install NPM Packages](#install-npm-packages)
  - [Setup Prisma](#setup-prisma)
  - [Run The App](#run-the-app)

## About The Project

### :camera: Screenshots

<p float="left">
  <img src="https://github.com/Jeda777/Clonegram/assets/66244271/33ec066a-9fea-47c4-bf7d-699766cd5f34" width="32%" />
  <img src="https://github.com/Jeda777/Clonegram/assets/66244271/ff12cc06-ec86-4cf6-b291-95250f99ac20" width="32%" />   
  <img src="https://github.com/Jeda777/Clonegram/assets/66244271/6b5170d9-8621-4da8-9018-72d872b1d2e6" width="32%" />
</p>

![DiscordClone1](https://github.com/Jeda777/Clonegram/assets/66244271/53a3825d-da6f-4f4a-b707-27e95057b7f9)
![DiscordClone2](https://github.com/Jeda777/Clonegram/assets/66244271/be8a1b0d-07c6-4e73-9afe-5cddab4d2b26)
![DiscordClone3](https://github.com/Jeda777/Clonegram/assets/66244271/a1b275bb-abe5-4bf5-bf0e-39dbc6e5de31)

### Demo Accounts

| Username   | E-mail            | Password     |
| ---------- | ----------------- | ------------ |
| gdfgret432 | example@gmail.com | QWERTy123!@# |
| fgd543     | example1@mail.com | grdFSW$#@453 |
| gdfsg654   | example2@mail.com | gfd543$#FD   |

### Features

- Authentication
- Light / Dark mode
- Responsive UI
- My feed
- Posting
- Saving posts
- Private account
- Real-time messaging

### Built With

#### Frontend

- Typescript
- React
- React router
- Redux
- Axios
- SocketIO
- Chakra UI

#### Backend

- Typescript
- Node.js
- Express
- JWT
- SocketIO

## :toolbox: Getting Started

### Prerequisites

- Node

### Clone The Repository

```sh
git clone https://github.com/Jeda777/Clonegram.git
```

### Environment Variables

#### Frontend

```js
VITE_BACKEND_URL=
VITE_API_URL=
```

#### Backend

```js
PORT=
DATABASE_URL=
FRONTEND_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
CLOUDINARY_URL=
```

### Install NPM packages

#### Frontend

```sh
cd client
npm i
```

#### Backend

```sh
cd server
npm i
```

### Setup Prisma

#### Backend

```sh
npx prisma generate
npx prisma db push
```

### Run The App

#### Frontend

```sh
npm run dev
```

#### Backend

```sh
npm run dev
```
