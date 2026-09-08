export declare class RegisterDto {
    email: string;
    password: string;
    name: string;
    role: 'hotel_owner' | 'bundle_creator' | 'admin';
    phone?: string;
    companyName?: string;
    businessLicense?: string;
    tourGuideLicense?: string;
    yearsExperience?: number;
    languagesSpoken?: string[];
}
