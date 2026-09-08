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
exports.BundlesController = void 0;
const common_1 = require("@nestjs/common");
const bundles_service_1 = require("./bundles.service");
const firebase_auth_guard_1 = require("../auth/firebase-auth.guard");
const roles_guard_1 = require("../common/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const create_bundle_dto_1 = require("./dto/create-bundle.dto");
const update_bundle_dto_1 = require("./dto/update-bundle.dto");
const response_util_1 = require("../common/response.util");
let BundlesController = class BundlesController {
    bundles;
    constructor(bundles) {
        this.bundles = bundles;
    }
    async list(user) {
        const data = await this.bundles.list(user.id);
        return (0, response_util_1.ok)(data);
    }
    async get(id, user) {
        const data = await this.bundles.get(id, user);
        return (0, response_util_1.ok)(data);
    }
    async create(user, dto) {
        const data = await this.bundles.create(user.id, dto);
        return (0, response_util_1.ok)(data, 'Bundle created');
    }
    async update(id, user, dto) {
        const data = await this.bundles.update(id, user, dto);
        return (0, response_util_1.ok)(data, 'Bundle updated');
    }
    async remove(id, user) {
        const data = await this.bundles.remove(id, user);
        return (0, response_util_1.ok)(data, 'Bundle deleted');
    }
};
exports.BundlesController = BundlesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BundlesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BundlesController.prototype, "get", null);
__decorate([
    (0, roles_decorator_1.Roles)('bundle_creator', 'admin'),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_bundle_dto_1.CreateBundleDto]),
    __metadata("design:returntype", Promise)
], BundlesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('bundle_creator', 'admin'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_bundle_dto_1.UpdateBundleDto]),
    __metadata("design:returntype", Promise)
], BundlesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('bundle_creator', 'admin'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BundlesController.prototype, "remove", null);
exports.BundlesController = BundlesController = __decorate([
    (0, common_1.Controller)('bundles'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [bundles_service_1.BundlesService])
], BundlesController);
//# sourceMappingURL=bundles.controller.js.map