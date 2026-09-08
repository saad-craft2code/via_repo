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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomDto = void 0;
const class_validator_1 = require("class-validator");
const BED_TYPES = [
    'single', 'double', 'queen', 'king', 'twin', 'sofa_bed', 'bunk',
];
const ROOM_AMENITIES = [
    'ac', 'minibar', 'safe', 'tv', 'balcony', 'kitchen',
    'washing_machine', 'city_view', 'sea_view',
];
class CreateRoomDto {
    roomType;
    bedType;
    maxGuests;
    pricePerNight;
    size;
    amenities;
    images;
    totalUnits;
}
exports.CreateRoomDto = CreateRoomDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "roomType", void 0);
__decorate([
    (0, class_validator_1.IsIn)(BED_TYPES),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "bedType", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "maxGuests", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "pricePerNight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsIn)(ROOM_AMENITIES, { each: true }),
    __metadata("design:type", Array)
], CreateRoomDto.prototype, "amenities", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateRoomDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "totalUnits", void 0);
//# sourceMappingURL=create-room.dto.js.map