<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Teslo Api

# Tecnologias utilizadas:
     . NestJs
     . Postgresql
     . Typeorm
     . Docker

1. Levantar la base de datos
```docker-compose up -d ```

2. Configurar en __app.module.ts__ el root del __.env__ para el proyecto

```npm i @nestjs/config```

    .  @Module({
         imports: [ConfigModule.forRoot()],
        })
    Para usar las variables .env
    . constructor(
        private readonly configService:ConfigService
        ){}

3. Crear el archivo __.env__ con las siguientes variables de entorno:

```
    DB_PASSWORD=password
    DB_NAME=dbname
    DB_HOST= localhost
    DB_PORT = 5432
    DB_USERNAMEDB= postgres
```

4. Instalar la bd

```$ npm install --save @nestjs/typeorm typeorm```