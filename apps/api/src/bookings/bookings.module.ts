import { Module } from '@nestjs/common';

/**
 * BookingsModule — placeholder for a later phase.
 *
 * The Booking Prisma model already exists (see prisma/schema.prisma).
 * Implementation will add:
 *   • GET    /bookings            — list user's bookings (filtered by role)
 *   • GET    /bookings/:id        — booking detail
 *   • POST   /bookings            — create a booking (hotel room OR bundle)
 *   • PATCH  /bookings/:id/status — confirm / cancel / complete
 *   • GET    /bookings/calendar   — calendar view (per-day aggregation)
 */
@Module({})
export class BookingsModule {}
