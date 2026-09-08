"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
let FirebaseAuthGuard = class FirebaseAuthGuard {
    config;
    jwt;
    prisma;
    logger = new common_1.Logger('FirebaseAuthGuard');
    constructor(config, jwt, prisma) {
        this.config = config;
        this.jwt = jwt;
        this.prisma = prisma;
    }
    async canActivate(ctx) {
        const req = ctx.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing Authorization header');
        }
        const token = authHeader.slice(7);
        const mockAuth = this.config.get('MOCK_AUTH', 'true') === 'true';
        let userId;
        if (mockAuth) {
            userId = await this.verifyMockToken(token);
        }
        else {
            userId = await this.verifyFirebaseToken(token);
        }
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        req.user = user;
        return true;
    }
    async verifyMockToken(token) {
        try {
            const payload = await this.jwt.verifyAsync(token);
            return payload.sub;
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async verifyFirebaseToken(_token) {
        this.logger.warn('Firebase verification not implemented yet — set MOCK_AUTH=true for dev.');
        throw new common_1.UnauthorizedException('Firebase auth not configured');
    }
};
exports.FirebaseAuthGuard = FirebaseAuthGuard;
exports.FirebaseAuthGuard = FirebaseAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], FirebaseAuthGuard);
//# sourceMappingURL=firebase-auth.guard.js.map