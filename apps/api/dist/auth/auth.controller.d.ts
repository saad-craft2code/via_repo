import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { User } from '@prisma/client';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    login(dto: LoginDto): Promise<import("@via/shared-types").ApiResponse<import("@via/shared-types").AuthResponse>>;
    register(dto: RegisterDto): Promise<import("@via/shared-types").ApiResponse<import("@via/shared-types").AuthResponse>>;
    me(user: User): Promise<import("@via/shared-types").ApiResponse<{
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
