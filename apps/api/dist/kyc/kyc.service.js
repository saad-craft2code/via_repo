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
exports.KycService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const TYPE_MAP = {
    business_license: 'BusinessLicense',
    id_proof: 'IdProof',
    tax_certificate: 'TaxCertificate',
    hotel_license: 'HotelLicense',
    property_ownership: 'PropertyOwnership',
    tour_guide_license: 'TourGuideLicense',
};
let KycService = class KycService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStatus(user) {
        const docs = await this.prisma.kycDocument.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        });
        return {
            kycStatus: user.kycStatus,
            kycSubmittedAt: user.kycSubmittedAt,
            kycReviewedAt: user.kycReviewedAt,
            kycRejectionReason: user.kycRejectionReason,
            documents: docs,
        };
    }
    async uploadDocument(user, dto) {
        const prismaType = TYPE_MAP[dto.type];
        if (!prismaType) {
            throw new common_1.BadRequestException(`Unknown KYC document type: ${dto.type}`);
        }
        const doc = await this.prisma.kycDocument.create({
            data: {
                userId: user.id,
                type: prismaType,
                fileUrl: dto.fileUrl,
                fileName: dto.fileName,
                mimeType: dto.mimeType ?? 'application/octet-stream',
                status: user.kycStatus === 'Approved' ? 'Approved' : 'NotSubmitted',
            },
        });
        if (user.kycStatus === 'Rejected') {
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    kycStatus: 'NotSubmitted',
                    kycRejectionReason: null,
                },
            });
        }
        return this.prisma.kycDocument.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        });
    }
    async submit(user) {
        const docs = await this.prisma.kycDocument.findMany({
            where: { userId: user.id },
        });
        if (docs.length === 0) {
            throw new common_1.BadRequestException('Upload at least one document before submitting for review');
        }
        const updated = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                kycStatus: 'Pending',
                kycSubmittedAt: new Date(),
                kycRejectionReason: null,
            },
        });
        await this.prisma.kycDocument.updateMany({
            where: { userId: user.id },
            data: { status: 'Pending' },
        });
        return {
            kycStatus: updated.kycStatus,
            kycSubmittedAt: updated.kycSubmittedAt,
        };
    }
};
exports.KycService = KycService;
exports.KycService = KycService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KycService);
//# sourceMappingURL=kyc.service.js.map