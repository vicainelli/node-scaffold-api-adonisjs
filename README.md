# NodeJS Scaffold API with AdonisJS 5

## Requirements

- Node.js >= 12.0.0
- npm >= 6.0.0

And if you don't have a database installed, you can user a Docker container.


## Set It Up

### Install node dependencies
```
npm install
```

### Create the .env file
```
cp .env.example .env
```

### Create the tmp directory

> This step is necessary only to run tests

```
mkdir -p tmp
```

### Add the Docker database variables

> Only if you are going to use the database from the Docker container.

```
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3307
MYSQL_USER=adonisjs
MYSQL_PASSWORD=secret
MYSQL_DB_NAME=adonisjs
MYSQL_ALLOW_EMPTY_PASSWORD=true
```

### Set up docker
```
docker-compose build && docker-compose up -d
```

### Run the migrations
```
node ace migrations:run
```

### Start and watch the serve
```
node ace serve --watch
```

