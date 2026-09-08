export declare class CreateRoomDto {
    roomType: string;
    bedType: string;
    maxGuests: number;
    pricePerNight: number;
    size?: number;
    amenities: string[];
    images: string[];
    totalUnits: number;
}
