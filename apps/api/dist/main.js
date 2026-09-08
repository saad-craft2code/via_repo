"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, '..', '.env'), override: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const auth_service_1 = require("./auth/auth.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    const config = app.get(config_1.ConfigService);
    const logger = new common_1.Logger('Bootstrap');
    const prefix = config.get('API_PREFIX', 'v1');
    app.setGlobalPrefix(prefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const corsOriginsRaw = config.get('CORS_ORIGINS', 'http://localhost:3000');
    const origins = corsOriginsRaw.split(',').map((o) => o.trim()).filter(Boolean);
    app.enableCors({
        origin: origins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    const port = config.get('PORT', 3001);
    await app.listen(port);
    logger.log(`API ready on http://localhost:${port}/${prefix}`);
    logger.log(`CORS origins: ${origins.join(', ')}`);
    logger.log(`Mock auth: ${config.get('MOCK_AUTH', 'true')}`);
    try {
        const authService = app.get(auth_service_1.AuthService);
        await authService.seedDemoAccounts();
    }
    catch (err) {
        logger.warn(`Demo-account seeding skipped: ${err.message}`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map