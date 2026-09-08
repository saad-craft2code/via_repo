import { PrismaService } from '../prisma/prisma.service';
import type { CreateHotelDto } from './dto/create-hotel.dto';
import type { UpdateHotelDto } from './dto/update-hotel.dto';
import type { User } from '@prisma/client';
export declare class HotelsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(ownerId: string): import(".prisma/client").Prisma.PrismaPromise<({
        rooms: {
            id: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        starRating: number;
        location: string;
        city: string | null;
        latitude: number | null;
        longitude: number | null;
        amenities: string[];
        images: string[];
        policies: import("@prisma/client/runtime/library").JsonValue | null;
        ownerId: string;
    })[]>;
    get(id: string, user: User): Promise<{
        rooms: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amenities: string[];
            images: string[];
            hotelId: string;
            roomType: string;
            bedType: string;
            maxGuests: number;
            pricePerNight: import("@prisma/client/runtime/library").Decimal;
            size: number | null;
            totalUnits: number;
            availableUnits: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        starRating: number;
        location: string;
        city: string | null;
        latitude: number | null;
        longitude: number | null;
        amenities: string[];
        images: string[];
        policies: import("@prisma/client/runtime/library").JsonValue | null;
        ownerId: string;
    }>;
    create(ownerId: string, dto: CreateHotelDto): import(".prisma/client").Prisma.Prisma__HotelClient<{
        rooms: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amenities: string[];
            images: string[];
            hotelId: string;
            roomType: string;
            bedType: string;
            maxGuests: number;
            pricePerNight: import("@prisma/client/runtime/library").Decimal;
            size: number | null;
            totalUnits: number;
            availableUnits: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        starRating: number;
        location: string;
        city: string | null;
        latitude: number | null;
        longitude: number | null;
        amenities: string[];
        images: string[];
        policies: import("@prisma/client/runtime/library").JsonValue | null;
        ownerId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, user: User, dto: UpdateHotelDto): Promise<{
        rooms: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amenities: string[];
            images: string[];
            hotelId: string;
            roomType: string;
            bedType: string;
            maxGuests: number;
            pricePerNight: import("@prisma/client/runtime/library").Decimal;
            size: number | null;
            totalUnits: number;
            availableUnits: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        starRating: number;
        location: string;
        city: string | null;
        latitude: number | null;
        longitude: number | null;
        amenities: string[];
        images: string[];
        policies: import("@prisma/client/runtime/library").JsonValue | null;
        ownerId: string;
    }>;
    remove(id: string, user: User): Promise<{
        id: string;
    }>;
}
