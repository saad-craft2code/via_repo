import { PrismaService } from '../prisma/prisma.service';
import type { CreateBundleDto } from './dto/create-bundle.dto';
import type { UpdateBundleDto } from './dto/update-bundle.dto';
import type { User } from '@prisma/client';
export declare class BundlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(creatorId: string): import(".prisma/client").Prisma.PrismaPromise<({
        days: ({
            items: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                location: string | null;
                type: string;
                title: string;
                startTime: string | null;
                endTime: string | null;
                cost: import("@prisma/client/runtime/library").Decimal | null;
                includedServices: string[];
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                bundleDayId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            dayNumber: number;
            bundleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        images: string[];
        title: string;
        includedServices: string[];
        durationDays: number;
        destinations: string[];
        guideName: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        difficulty: string;
        groupSize: number | null;
        creatorId: string;
        status: import(".prisma/client").$Enums.BundleStatus;
    })[]>;
    get(id: string, user: User): Promise<{
        days: ({
            items: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                location: string | null;
                type: string;
                title: string;
                startTime: string | null;
                endTime: string | null;
                cost: import("@prisma/client/runtime/library").Decimal | null;
                includedServices: string[];
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                bundleDayId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            dayNumber: number;
            bundleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        images: string[];
        title: string;
        includedServices: string[];
        durationDays: number;
        destinations: string[];
        guideName: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        difficulty: string;
        groupSize: number | null;
        creatorId: string;
        status: import(".prisma/client").$Enums.BundleStatus;
    }>;
    create(creatorId: string, dto: CreateBundleDto): Promise<{
        days: ({
            items: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                location: string | null;
                type: string;
                title: string;
                startTime: string | null;
                endTime: string | null;
                cost: import("@prisma/client/runtime/library").Decimal | null;
                includedServices: string[];
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                bundleDayId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            dayNumber: number;
            bundleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        images: string[];
        title: string;
        includedServices: string[];
        durationDays: number;
        destinations: string[];
        guideName: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        difficulty: string;
        groupSize: number | null;
        creatorId: string;
        status: import(".prisma/client").$Enums.BundleStatus;
    }>;
    update(id: string, user: User, dto: UpdateBundleDto): Promise<{
        days: ({
            items: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                location: string | null;
                type: string;
                title: string;
                startTime: string | null;
                endTime: string | null;
                cost: import("@prisma/client/runtime/library").Decimal | null;
                includedServices: string[];
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                bundleDayId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            dayNumber: number;
            bundleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        images: string[];
        title: string;
        includedServices: string[];
        durationDays: number;
        destinations: string[];
        guideName: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        difficulty: string;
        groupSize: number | null;
        creatorId: string;
        status: import(".prisma/client").$Enums.BundleStatus;
    }>;
    remove(id: string, user: User): Promise<{
        id: string;
    }>;
}
