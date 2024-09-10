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

1. Clonar proyecto

2. Hacer ```npm install```

3. Clonar el archivo __.env.template.__ y renombrarlo a __.env__

4. Ejecutar SEED ```localhost:3000/api/seed```

5. Configurar en __app.module.ts__ el root del __.env__ para el proyecto

    ```npm i @nestjs/config```
    
        .  @Module({
             imports: [ConfigModule.forRoot()],
            })
        Para usar las variables .env
        . constructor(
            private readonly configService:ConfigService
            ){}
    ```

6. Levantar la base de datos
```docker-compose up -d ```


7. Instalar la bd ```$ npm install --save @nestjs/typeorm typeorm``` ```npm install pg --save```