"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const kyc_service_1 = require("./kyc.service");
const firebase_auth_guard_1 = require("../auth/firebase-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const response_util_1 = require("../common/response.util");
let KycController = class KycController {
    kyc;
    config;
    constructor(kyc, config) {
        this.kyc = kyc;
        this.config = config;
    }
    async status(user) {
        const data = await this.kyc.getStatus(user);
        return (0, response_util_1.ok)(data);
    }
    async uploadDocument(user, file, body) {
        if (!file) {
            const dto = {
                type: body.type,
                fileUrl: body.fileUrl ?? `mock://uploads/${body.type}`,
                fileName: body.fileName ?? `${body.type}.pdf`,
                mimeType: body.mimeType ?? 'application/octet-stream',
            };
            const data = await this.kyc.uploadDocument(user, dto);
            return (0, response_util_1.ok)(data, 'Document uploaded (mock URL)');
        }
        const dto = {
            type: body.type,
            fileUrl: `/uploads/${file.filename}`,
            fileName: file.originalname,
            mimeType: file.mimetype,
        };
        const data = await this.kyc.uploadDocument(user, dto);
        return (0, response_util_1.ok)(data, 'Document uploaded');
    }
    async submit(user) {
        const data = await this.kyc.submit(user);
        return (0, response_util_1.ok)(data, 'KYC submitted for review');
    }
};
exports.KycController = KycController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "status", null);
__decorate([
    (0, common_1.Post)('documents'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (_req, _file, cb) => {
                const dir = process.env.UPLOAD_DIR || './uploads';
                cb(null, dir);
            },
            filename: (_req, file, cb) => {
                const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                cb(null, `${unique}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
    })),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Post)('submit'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "submit", null);
exports.KycController = KycController = __decorate([
    (0, common_1.Controller)('kyc'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __metadata("design:paramtypes", [kyc_service_1.KycService,
        config_1.ConfigService])
], KycController);
//# sourceMappingURL=kyc.controller.js.map