import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import type { User } from '@prisma/client';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    profile(user: User): Promise<import("@via/shared-types").ApiResponse<{
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
    }>>;
    updateProfile(user: User, dto: UpdateProfileDto): Promise<import("@via/shared-types").ApiResponse<{
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
    }>>;
}
