"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = ok;
exports.fail = fail;
exports.paginate = paginate;
function ok(data, message) {
    return { success: true, data, message };
}
function fail(message, errors) {
    return { success: false, message, errors };
}
function paginate(total, page, pageSize) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    return {
        page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
    };
}
//# sourceMappingURL=response.util.js.map