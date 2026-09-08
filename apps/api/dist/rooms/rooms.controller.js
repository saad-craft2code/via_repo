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
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const rooms_service_1 = require("./rooms.service");
const firebase_auth_guard_1 = require("../auth/firebase-auth.guard");
const roles_guard_1 = require("../common/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
const response_util_1 = require("../common/response.util");
let RoomsController = class RoomsController {
    rooms;
    constructor(rooms) {
        this.rooms = rooms;
    }
    async list(hotelId, user) {
        const data = await this.rooms.list(hotelId, user);
        return (0, response_util_1.ok)(data);
    }
    async get(hotelId, roomId, user) {
        const data = await this.rooms.get(hotelId, roomId, user);
        return (0, response_util_1.ok)(data);
    }
    async create(hotelId, user, dto) {
        const data = await this.rooms.create(hotelId, user, dto);
        return (0, response_util_1.ok)(data, 'Room created');
    }
    async update(hotelId, roomId, user, dto) {
        const data = await this.rooms.update(hotelId, roomId, user, dto);
        return (0, response_util_1.ok)(data, 'Room updated');
    }
    async remove(hotelId, roomId, user) {
        const data = await this.rooms.remove(hotelId, roomId, user);
        return (0, response_util_1.ok)(data, 'Room deleted');
    }
};
exports.RoomsController = RoomsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('hotelId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':roomId'),
    __param(0, (0, common_1.Param)('hotelId')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "get", null);
__decorate([
    (0, roles_decorator_1.Roles)('hotel_owner', 'admin'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('hotelId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('hotel_owner', 'admin'),
    (0, common_1.Patch)(':roomId'),
    __param(0, (0, common_1.Param)('hotelId')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('hotel_owner', 'admin'),
    (0, common_1.Delete)(':roomId'),
    __param(0, (0, common_1.Param)('hotelId')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "remove", null);
exports.RoomsController = RoomsController = __decorate([
    (0, common_1.Controller)('hotels/:hotelId/rooms'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
//# sourceMappingURL=rooms.controller.js.map