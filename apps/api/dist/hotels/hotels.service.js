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
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let HotelsService = class HotelsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    list(ownerId) {
        return this.prisma.hotel.findMany({
            where: { ownerId },
            include: { rooms: { select: { id: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async get(id, user) {
        const hotel = await this.prisma.hotel.findUnique({
            where: { id },
            include: { rooms: true },
        });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        if (hotel.ownerId !== user.id && user.role !== 'Admin') {
            throw new common_1.ForbiddenException('You do not own this hotel');
        }
        return hotel;
    }
    create(ownerId, dto) {
        return this.prisma.hotel.create({
            data: {
                ownerId,
                name: dto.name,
                description: dto.description,
                starRating: dto.starRating,
                location: dto.location,
                city: dto.city,
                latitude: dto.latitude,
                longitude: dto.longitude,
                amenities: dto.amenities,
                images: dto.images,
                policies: dto.policies ?? null,
            },
            include: { rooms: true },
        });
    }
    async update(id, user, dto) {
        const existing = await this.get(id, user);
        return this.prisma.hotel.update({
            where: { id: existing.id },
            data: {
                ...(dto.name !== undefined && { name: dto.name }),
                ...(dto.description !== undefined && { description: dto.description }),
                ...(dto.starRating !== undefined && { starRating: dto.starRating }),
                ...(dto.location !== undefined && { location: dto.location }),
                ...(dto.city !== undefined && { city: dto.city }),
                ...(dto.latitude !== undefined && { latitude: dto.latitude }),
                ...(dto.longitude !== undefined && { longitude: dto.longitude }),
                ...(dto.amenities !== undefined && { amenities: dto.amenities }),
                ...(dto.images !== undefined && { images: dto.images }),
                ...(dto.policies !== undefined && { policies: dto.policies }),
            },
            include: { rooms: true },
        });
    }
    async remove(id, user) {
        await this.get(id, user);
        await this.prisma.hotel.delete({ where: { id } });
        return { id };
    }
};
exports.HotelsService = HotelsService;
exports.HotelsService = HotelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HotelsService);
//# sourceMappingURL=hotels.service.js.map