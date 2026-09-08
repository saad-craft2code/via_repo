export declare class CreateHotelDto {
    name: string;
    description: string;
    starRating: number;
    location: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    amenities: string[];
    images: string[];
    policies?: {
        checkIn?: string;
        checkOut?: string;
        smokingAllowed?: boolean;
        petsAllowed?: boolean;
        cancellationPolicy?: string;
    };
}
