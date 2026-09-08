import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import type { User } from '@prisma/client';
export declare class HotelsController {
    private readonly hotels;
    constructor(hotels: HotelsService);
    list(user: User): Promise<import("@via/shared-types").ApiResponse<({
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
    })[]>>;
    get(id: string, user: User): Promise<import("@via/shared-types").ApiResponse<{
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
    }>>;
    create(user: User, dto: CreateHotelDto): Promise<import("@via/shared-types").ApiResponse<{
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
    }>>;
    update(id: string, user: User, dto: UpdateHotelDto): Promise<import("@via/shared-types").ApiResponse<{
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
    }>>;
    remove(id: string, user: User): Promise<import("@via/shared-types").ApiResponse<{
        id: string;
    }>>;
}
