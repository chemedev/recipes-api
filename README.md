- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contact](#contact)

## About The Project

This project consists of an API with Nodejs and GraphQL, Express microframework, an a PostgreSQL database

### Built With

- [Node.js](https://nodejs.org/en/)

## Getting Started

To initialize project you must already have Nodejs and PostgreSQL on your system.
Alternatively, docker files are provided.

### Prerequisites

- npm

```sh
npm install npm@latest -g
```

### Installation

1.  Clone the API repository

```sh
git clone https://github.com/me-chell/recipes-api.git
```

2. Install dependencies

```sh
npm install
```

3. Use your own DATABASE_URL in .env file. Default is:

```
DATABASE_URL='postgres://postgres:postgres@localhost:5432/postgres'
```

4. Initialize DB with default entries from ./database/initialize.sql file

5. Start app.

```sh
npm start
```

6. Use ./queries/\*.gql to test queries.

## Contact

Juan Chemello - [@mechell_dev](https://twitter.com/mechell_dev) - juanchemell@gmail.com

Project Link: [https://github.com/me-chell/recipes-api](https://github.com/me-chell/recipes-api)
