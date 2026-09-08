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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwt;
    config;
    logger = new common_1.Logger('AuthService');
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async seedDemoAccounts() {
        if (this.config.get('SEED_DEMO_ACCOUNTS', 'true') !== 'true')
            return;
        const accounts = [
            {
                email: this.config.get('DEMO_HOTEL_EMAIL', 'hotel@viatrips.com'),
                password: this.config.get('DEMO_HOTEL_PASSWORD', 'password123'),
                name: 'Hotel Owner Demo',
                role: 'HotelOwner',
                companyName: 'Via Trips Hotel Group',
            },
            {
                email: this.config.get('DEMO_BUNDLE_EMAIL', 'bundle@viatrips.com'),
                password: this.config.get('DEMO_BUNDLE_PASSWORD', 'password123'),
                name: 'Bundle Creator Demo',
                role: 'BundleCreator',
                companyName: 'Via Trips Adventures',
            },
        ];
        for (const acc of accounts) {
            const existing = await this.prisma.user.findUnique({
                where: { email: acc.email.toLowerCase() },
            });
            if (existing)
                continue;
            await this.prisma.user.create({
                data: {
                    email: acc.email.toLowerCase(),
                    passwordHash: this.hashPassword(acc.password),
                    name: acc.name,
                    role: acc.role,
                    companyName: acc.companyName,
                    languagesSpoken: [],
                },
            });
            this.logger.log(`Seeded demo account: ${acc.email} (${acc.role})`);
        }
    }
    async login(dto) {
        const role = this.normaliseRole(dto.role, dto.email);
        let user = await this.prisma.user.findUnique({
            where: { email: dto.email.toLowerCase() },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email: dto.email.toLowerCase(),
                    passwordHash: this.hashPassword(dto.password),
                    name: dto.email.split('@')[0],
                    role,
                    languagesSpoken: [],
                },
            });
            this.logger.log(`Auto-created mock user ${user.email} (${user.role})`);
        }
        return this.buildAuthResponse(user.id, user.email, user.role);
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email.toLowerCase() },
        });
        if (existing)
            throw new common_1.ConflictException('Email already registered');
        const prismaRole = this.roleToPrisma(dto.role);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email.toLowerCase(),
                passwordHash: this.hashPassword(dto.password),
                name: dto.name,
                role: prismaRole,
                phone: dto.phone,
                companyName: dto.companyName,
                businessLicense: dto.businessLicense,
                tourGuideLicense: dto.tourGuideLicense,
                yearsExperience: dto.yearsExperience,
                languagesSpoken: dto.languagesSpoken ?? [],
            },
        });
        return this.buildAuthResponse(user.id, user.email, user.role);
    }
    async me(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async buildAuthResponse(userId, email, role) {
        const payload = { sub: userId, email, role: this.roleFromPrisma(role) };
        const token = await this.jwt.signAsync(payload, {
            secret: this.config.get('JWT_SECRET'),
            expiresIn: this.config.get('JWT_EXPIRES_IN', '7d'),
        });
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        return { token, user: user };
    }
    async verifyToken(token) {
        return this.jwt.verifyAsync(token, {
            secret: this.config.get('JWT_SECRET'),
        });
    }
    normaliseRole(role, email) {
        if (role === 'hotel_owner')
            return 'HotelOwner';
        if (role === 'bundle_creator')
            return 'BundleCreator';
        if (role === 'admin')
            return 'Admin';
        if (email.includes('bundle'))
            return 'BundleCreator';
        if (email.includes('admin'))
            return 'Admin';
        return 'HotelOwner';
    }
    roleToPrisma(r) {
        if (r === 'hotel_owner')
            return 'HotelOwner';
        if (r === 'bundle_creator')
            return 'BundleCreator';
        return 'Admin';
    }
    roleFromPrisma(r) {
        if (r === 'HotelOwner')
            return 'hotel_owner';
        if (r === 'BundleCreator')
            return 'bundle_creator';
        return 'admin';
    }
    hashPassword(p) {
        return `mock$${Buffer.from(p).toString('base64')}`;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map