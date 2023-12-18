"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./modules/app/app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://localhost:3000',
            'http://localhost',
            'https://localhost',
            'http://31.172.73.217',
            'https://31.172.73.217',
            'http://up.gravitino.ru',
            'http://gravitino.ru',
            'https://up.gravitino.ru',
            'https://gravitino.ru',
        ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('GRAIVTINO ASU API')
        .setDescription('The GRAIVTINO ASU API!')
        .setVersion('1.0')
        .addTag('GRAIVTINO ASU')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    })
        .build();
    const port = configService.get('port');
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map