import { PrismaService } from '../prisma/prisma.service';
import type { UploadKycDocumentDto } from './dto/upload-document.dto';
import type { User } from '@prisma/client';
export declare class KycService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStatus(user: User): Promise<{
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
    }>;
    uploadDocument(user: User, dto: UploadKycDocumentDto): Promise<{
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
    }[]>;
    submit(user: User): Promise<{
        kycStatus: import(".prisma/client").$Enums.KycStatus;
        kycSubmittedAt: Date;
    }>;
}
