import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class FirebaseAuthGuard implements CanActivate {
    private readonly config;
    private readonly jwt;
    private readonly prisma;
    private readonly logger;
    constructor(config: ConfigService, jwt: JwtService, prisma: PrismaService);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
    private verifyMockToken;
    private verifyFirebaseToken;
}
