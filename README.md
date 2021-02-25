## Prerequisites
1. [Docker](https://www.docker.com/)

## Description

This repository is a starter kit for backend development using the following stack:

1. ExpressJS
2. GraphQL
3. TypeORM

## Commands

To install node dependences:

```bash
yarn
```

To start the docker server:

```bash
make server.start
```

To generate the migrations
```bash
make database.migrate
```

To apply the pending mirations
```bash
make database.upgrade
```
