import { ConfigService } from '@nestjs/config';
import { KycService } from './kyc.service';
import type { User } from '@prisma/client';
export declare class KycController {
    private readonly kyc;
    private readonly config;
    constructor(kyc: KycService, config: ConfigService);
    status(user: User): Promise<import("@via/shared-types").ApiResponse<{
        kycStatus: import(".prisma/client").$Enums.KycStatus;
        kycSubmittedAt: Date;
        kycReviewedAt: Date;
        kycRejectionReason: string;
        documents: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.KycDocumentType;
            status: import(".prisma/client").$Enums.KycStatus;
            fileUrl: string;
            fileName: string;
            mimeType: string;
            userId: string;
            adminNotes: string | null;
        }[];
    }>>;
    uploadDocument(user: User, file: Express.Multer.File, body: {
        type: string;
        fileUrl?: string;
        fileName?: string;
        mimeType?: string;
    }): Promise<import("@via/shared-types").ApiResponse<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.KycDocumentType;
        status: import(".prisma/client").$Enums.KycStatus;
        fileUrl: string;
        fileName: string;
        mimeType: string;
        userId: string;
        adminNotes: string | null;
    }[]>>;
    submit(user: User): Promise<import("@via/shared-types").ApiResponse<{
        kycStatus: import(".prisma/client").$Enums.KycStatus;
        kycSubmittedAt: Date;
    }>>;
}
