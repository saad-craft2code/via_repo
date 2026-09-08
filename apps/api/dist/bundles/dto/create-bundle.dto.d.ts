export declare class CreateBundleItemDto {
    type: string;
    title: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    cost?: number;
    includedServices?: string[];
    metadata?: Record<string, unknown>;
}
export declare class CreateBundleDayDto {
    dayNumber: number;
    title: string;
    description?: string;
    items: CreateBundleItemDto[];
}
export declare class CreateBundleDto {
    title: string;
    description: string;
    durationDays: number;
    destinations: string[];
    images: string[];
    guideName?: string;
    price: number;
    difficulty?: string;
    groupSize?: number;
    includedServices: string[];
    days: CreateBundleDayDto[];
}
