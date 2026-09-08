import { PrismaService } from '../prisma/prisma.service';
import type { CreateRoomDto } from './dto/create-room.dto';
import type { UpdateRoomDto } from './dto/update-room.dto';
import type { User } from '@prisma/client';
export declare class RoomsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(hotelId: string, user: User): Promise<{
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
    }[]>;
    get(hotelId: string, roomId: string, user: User): Promise<{
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
    }>;
    create(hotelId: string, user: User, dto: CreateRoomDto): Promise<{
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
    }>;
    update(hotelId: string, roomId: string, user: User, dto: UpdateRoomDto): Promise<{
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
    }>;
    remove(hotelId: string, roomId: string, user: User): Promise<{
        id: string;
    }>;
    private assertHotelOwned;
}
