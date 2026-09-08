"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("./response.util");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    logger = new common_1.Logger('Exception');
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const payload = exception.getResponse();
            if (typeof payload === 'string') {
                message = payload;
            }
            else if (payload && typeof payload === 'object') {
                const obj = payload;
                message = obj.message ?? message;
                if (Array.isArray(obj.message)) {
                    errors = obj.message.map((m) => ({ message: m }));
                    message = 'Validation failed';
                }
            }
        }
        else if (exception instanceof Error) {
            message = exception.message;
            this.logger.error(exception.stack);
        }
        res.status(status).json((0, response_util_1.fail)(message, errors));
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map