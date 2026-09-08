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
exports.BundlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BundlesService = class BundlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    list(creatorId) {
        return this.prisma.bundle.findMany({
            where: { creatorId },
            include: { days: { include: { items: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async get(id, user) {
        const bundle = await this.prisma.bundle.findUnique({
            where: { id },
            include: { days: { include: { items: true }, orderBy: { dayNumber: 'asc' } } },
        });
        if (!bundle)
            throw new common_1.NotFoundException('Bundle not found');
        if (bundle.creatorId !== user.id && user.role !== 'Admin') {
            throw new common_1.ForbiddenException('You do not own this bundle');
        }
        return bundle;
    }
    async create(creatorId, dto) {
        return this.prisma.bundle.create({
            data: {
                creatorId,
                title: dto.title,
                description: dto.description,
                durationDays: dto.durationDays,
                destinations: dto.destinations,
                images: dto.images,
                guideName: dto.guideName,
                price: dto.price,
                difficulty: dto.difficulty ?? 'easy',
                groupSize: dto.groupSize,
                includedServices: dto.includedServices,
                status: 'Draft',
                days: {
                    create: dto.days.map((d) => ({
                        dayNumber: d.dayNumber,
                        title: d.title,
                        description: d.description,
                        items: {
                            create: d.items.map((it) => ({
                                type: it.type,
                                title: it.title,
                                description: it.description,
                                startTime: it.startTime,
                                endTime: it.endTime,
                                location: it.location,
                                cost: it.cost,
                                includedServices: it.includedServices ?? [],
                                metadata: it.metadata,
                            })),
                        },
                    })),
                },
            },
            include: { days: { include: { items: true }, orderBy: { dayNumber: 'asc' } } },
        });
    }
    async update(id, user, dto) {
        const existing = await this.get(id, user);
        if (dto.days && dto.days.length > 0) {
            await this.prisma.bundleDay.deleteMany({ where: { bundleId: existing.id } });
            await this.prisma.bundleDay.createMany({
                data: dto.days.map((d) => ({
                    bundleId: existing.id,
                    dayNumber: d.dayNumber,
                    title: d.title,
                    description: d.description,
                })),
            });
            const createdDays = await this.prisma.bundleDay.findMany({
                where: { bundleId: existing.id },
                orderBy: { dayNumber: 'asc' },
            });
            for (const [i, d] of dto.days.entries()) {
                const dbDay = createdDays[i];
                if (!dbDay)
                    continue;
                if (d.items && d.items.length > 0) {
                    await this.prisma.bundleItem.createMany({
                        data: d.items.map((it) => ({
                            bundleDayId: dbDay.id,
                            type: it.type,
                            title: it.title,
                            description: it.description,
                            startTime: it.startTime,
                            endTime: it.endTime,
                            location: it.location,
                            cost: it.cost,
                            includedServices: it.includedServices ?? [],
                            metadata: it.metadata,
                        })),
                    });
                }
            }
        }
        return this.prisma.bundle.update({
            where: { id: existing.id },
            data: {
                ...(dto.title !== undefined && { title: dto.title }),
                ...(dto.description !== undefined && { description: dto.description }),
                ...(dto.durationDays !== undefined && { durationDays: dto.durationDays }),
                ...(dto.destinations !== undefined && { destinations: dto.destinations }),
                ...(dto.images !== undefined && { images: dto.images }),
                ...(dto.guideName !== undefined && { guideName: dto.guideName }),
                ...(dto.price !== undefined && { price: dto.price }),
                ...(dto.difficulty !== undefined && { difficulty: dto.difficulty }),
                ...(dto.groupSize !== undefined && { groupSize: dto.groupSize }),
                ...(dto.includedServices !== undefined && {
                    includedServices: dto.includedServices,
                }),
            },
            include: { days: { include: { items: true }, orderBy: { dayNumber: 'asc' } } },
        });
    }
    async remove(id, user) {
        await this.get(id, user);
        await this.prisma.bundle.delete({ where: { id } });
        return { id };
    }
};
exports.BundlesService = BundlesService;
exports.BundlesService = BundlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BundlesService);
//# sourceMappingURL=bundles.service.js.map