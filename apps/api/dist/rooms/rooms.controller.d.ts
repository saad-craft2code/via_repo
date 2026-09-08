import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import type { User } from '@prisma/client';
export declare class RoomsController {
    private readonly rooms;
    constructor(rooms: RoomsService);
    list(hotelId: string, user: User): Promise<import("@via/shared-types").ApiResponse<{
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
    }[]>>;
    get(hotelId: string, roomId: string, user: User): Promise<import("@via/shared-types").ApiResponse<{
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
    }>>;
    create(hotelId: string, user: User, dto: CreateRoomDto): Promise<import("@via/shared-types").ApiResponse<{
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
    }>>;
    update(hotelId: string, roomId: string, user: User, dto: UpdateRoomDto): Promise<import("@via/shared-types").ApiResponse<{
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
    }>>;
    remove(hotelId: string, roomId: string, user: User): Promise<import("@via/shared-types").ApiResponse<{
        id: string;
    }>>;
}
