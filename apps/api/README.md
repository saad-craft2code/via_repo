# Via Trips — Monorepo Setup

A bilingual (Arabic/English, RTL-aware) travel provider panel with a NestJS backend and Next.js frontend.

## Structure

```
/home/z/my-project/
├── apps/
│   └── api/                    # NestJS backend (port 3001)
│       ├── prisma/schema.prisma
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── auth/            # mock JWT auth + FirebaseAuthGuard (swap point)
│       │   ├── hotels/          # CRUD /hotels
│       │   ├── rooms/           # CRUD /hotels/:hotelId/rooms
│       │   ├── bundles/         # CRUD /bundles (with day-by-day itinerary)
│       │   ├── kyc/             # KYC status + document upload + submit
│       │   ├── users/           # /user/profile
│       │   ├── bookings/        # placeholder
│       │   ├── prisma/          # PrismaService
│       │   └── common/          # GlobalExceptionFilter, RolesGuard
│       └── .env                 # DATABASE_URL, JWT_SECRET, MOCK_AUTH=true
├── packages/
│   └── shared-types/            # @via/shared-types — TypeScript types shared by both apps
└── src/                         # Next.js frontend (port 3000)
    ├── lib/api.ts               # fetch wrapper with Bearer token + 401 handling
    ├── lib/store.ts             # Zustand store (token, user, login/register/logout)
    ├── services/                # auth/hotel/room/bundle/kyc/user service files
    └── components/
        ├── auth/                # login-form, register-form (API-driven)
        ├── hotel-owner/         # ho-hotels, ho-hotel-wizard, ho-rooms, ho-kyc, ho-profile
        └── bundle-creator/      # bc-bundles, bc-bundle-wizard
```

## Quick start

### 1. Database
Start a PostgreSQL server on `localhost:5432` with database `via` and user `via` (password `via`).
Adjust `apps/api/.env` if your connection differs.

### 2. Backend
```bash
cd apps/api
bun install
bunx prisma generate
bunx prisma db push    # creates all tables
bun run dev            # starts NestJS on http://localhost:3001
```

### 3. Frontend
From the project root:
```bash
bun install
bun run dev            # starts Next.js on http://localhost:3000
```

## Mock auth (dev mode)

`MOCK_AUTH=true` in `apps/api/.env`. The backend accepts any email + password (≥6 chars).
Demo accounts that auto-fill the correct role:
- `test@hotel.com` / `password` → hotel_owner
- `test@bundle.com` / `password` → bundle_creator
- `admin@via.com` / `password` → admin

Unknown emails are auto-created on first login.

## Firebase swap (later)

When you're ready to switch to real Firebase ID token verification:

1. Install `firebase-admin` in `apps/api`.
2. Initialise the admin app in `apps/api/src/main.ts` using `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` from `.env`.
3. In `apps/api/src/auth/firebase-auth.guard.ts`, replace the body of `verifyFirebaseToken()` with `admin.auth().verifyIdToken(token)` and look up the user by `firebaseUid`.
4. Set `MOCK_AUTH=false` in `.env`.

The frontend code does NOT need to change — the JWT token is sent in the `Authorization: Bearer` header regardless of which mode the backend is in.

## API endpoints (all under `/v1`)

| Method | Path | Auth | Role |
|---|---|---|---|
| POST | `/auth/login` | — | — |
| POST | `/auth/register` | — | — |
| GET | `/auth/me` | Bearer | — |
| GET | `/user/profile` | Bearer | — |
| PATCH | `/user/profile` | Bearer | — |
| GET | `/hotels` | Bearer | — |
| POST | `/hotels` | Bearer | hotel_owner, admin |
| GET/PATCH/DELETE | `/hotels/:id` | Bearer | owner |
| GET | `/hotels/:hotelId/rooms` | Bearer | — |
| POST | `/hotels/:hotelId/rooms` | Bearer | hotel_owner, admin |
| GET/PATCH/DELETE | `/hotels/:hotelId/rooms/:roomId` | Bearer | owner |
| GET | `/bundles` | Bearer | — |
| POST | `/bundles` | Bearer | bundle_creator, admin |
| GET/PATCH/DELETE | `/bundles/:id` | Bearer | creator |
| GET | `/kyc` | Bearer | — |
| POST | `/kyc/documents` | Bearer (multipart) | — |
| POST | `/kyc/submit` | Bearer | — |

## Notes
- File uploads (KYC docs, hotel/bundle images) are stored locally in `apps/api/uploads/` for now. The frontend currently sends image URLs (paste-into-input) for hotels/bundles; the KYC screen uses real multipart file upload.
- The Next.js app's old `src/lib/db.ts` (legacy SQLite Prisma) is unused — the app now calls the API exclusively.
- All responses use the standard `ApiResponse<T>` shape: `{ success, data?, message?, errors?, pagination? }`.
