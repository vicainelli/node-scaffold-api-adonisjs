# NodeJS Scaffold API with AdonisJS 5

## Requirements

- Node.js >= 12.0.0
- npm >= 6.0.0

And if you don't have a database installed, you can user a Docker container.


## Set It Up

#### 1. Install node dependencies

```
npm install
```

#### 2. Create the .env file
```
cp .env.example .env
```

#### 4. Set up docker
```
docker-compose build && docker-compose up -d
```

#### 5. Run the migrations

```
node ace migrations:run
```

#### 6. Start and watch the serve
```
node ace serve --watch
```
