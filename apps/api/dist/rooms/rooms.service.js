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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RoomsService = class RoomsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(hotelId, user) {
        await this.assertHotelOwned(hotelId, user);
        return this.prisma.room.findMany({
            where: { hotelId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async get(hotelId, roomId, user) {
        await this.assertHotelOwned(hotelId, user);
        const room = await this.prisma.room.findUnique({ where: { id: roomId } });
        if (!room || room.hotelId !== hotelId) {
            throw new common_1.NotFoundException('Room not found');
        }
        return room;
    }
    async create(hotelId, user, dto) {
        await this.assertHotelOwned(hotelId, user);
        return this.prisma.room.create({
            data: {
                hotelId,
                roomType: dto.roomType,
                bedType: dto.bedType,
                maxGuests: dto.maxGuests,
                pricePerNight: dto.pricePerNight,
                size: dto.size,
                amenities: dto.amenities,
                images: dto.images,
                totalUnits: dto.totalUnits,
                availableUnits: dto.totalUnits,
            },
        });
    }
    async update(hotelId, roomId, user, dto) {
        await this.get(hotelId, roomId, user);
        return this.prisma.room.update({
            where: { id: roomId },
            data: {
                ...(dto.roomType !== undefined && { roomType: dto.roomType }),
                ...(dto.bedType !== undefined && { bedType: dto.bedType }),
                ...(dto.maxGuests !== undefined && { maxGuests: dto.maxGuests }),
                ...(dto.pricePerNight !== undefined && { pricePerNight: dto.pricePerNight }),
                ...(dto.size !== undefined && { size: dto.size }),
                ...(dto.amenities !== undefined && { amenities: dto.amenities }),
                ...(dto.images !== undefined && { images: dto.images }),
                ...(dto.totalUnits !== undefined && {
                    totalUnits: dto.totalUnits,
                    availableUnits: dto.totalUnits,
                }),
            },
        });
    }
    async remove(hotelId, roomId, user) {
        await this.get(hotelId, roomId, user);
        await this.prisma.room.delete({ where: { id: roomId } });
        return { id: roomId };
    }
    async assertHotelOwned(hotelId, user) {
        const hotel = await this.prisma.hotel.findUnique({
            where: { id: hotelId },
            select: { ownerId: true },
        });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        if (hotel.ownerId !== user.id && user.role !== 'Admin') {
            throw new common_1.ForbiddenException('You do not own this hotel');
        }
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map