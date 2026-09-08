import { PrismaService } from '../prisma/prisma.service';
import type { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        name: string;
        phone: string | null;
        companyName: string | null;
        businessLicense: string | null;
        tourGuideLicense: string | null;
        yearsExperience: number | null;
        languagesSpoken: string[];
        id: string;
        firebaseUid: string | null;
        passwordHash: string | null;
        avatarUrl: string | null;
        kycStatus: import(".prisma/client").$Enums.KycStatus;
        kycSubmittedAt: Date | null;
        kycReviewedAt: Date | null;
        kycRejectionReason: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        name: string;
        phone: string | null;
        companyName: string | null;
        businessLicense: string | null;
        tourGuideLicense: string | null;
        yearsExperience: number | null;
        languagesSpoken: string[];
        id: string;
        firebaseUid: string | null;
        passwordHash: string | null;
        avatarUrl: string | null;
        kycStatus: import(".prisma/client").$Enums.KycStatus;
        kycSubmittedAt: Date | null;
        kycReviewedAt: Date | null;
        kycRejectionReason: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
