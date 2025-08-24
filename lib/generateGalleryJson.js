"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_s3_1 = require("@aws-sdk/client-s3");
require("dotenv/config"); // automatically loads .env
var path = require("path");
var fs = require("fs");
var s3 = new client_s3_1.S3({
    credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.MY_AWS_REGION,
});
/**
 * List images in a folder
 */
function listImages(folder) {
    return __awaiter(this, void 0, void 0, function () {
        var command, response;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    command = new client_s3_1.ListObjectsV2Command({
                        Bucket: process.env.MY_AWS_BUCKET_NAME,
                        Prefix: "".concat(folder, "/"),
                    });
                    return [4 /*yield*/, s3.send(command)];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, ((_b = (_a = response.Contents) === null || _a === void 0 ? void 0 : _a.filter(function (item) {
                            return item.Key &&
                                !item.Key.endsWith("/") &&
                                !item.Key.includes("/thumbs/") &&
                                !item.Key.includes("/medium");
                        }).map(function (item, index) {
                            var fullKey = item.Key;
                            var filename = fullKey.split("/").pop();
                            var thumbKey = "".concat(folder, "/thumbs/").concat(filename === null || filename === void 0 ? void 0 : filename.replace(/\.[^/.]+$/, ".avif"));
                            var mediumKey = "".concat(folder, "/medium/").concat(filename === null || filename === void 0 ? void 0 : filename.replace(/\.[^/.]+$/, ".avif"));
                            return {
                                url: "https://".concat(process.env.MY_AWS_CLOUDFRONT_DOMAIN, "/").concat(fullKey),
                                thumbUrl: "https://".concat(process.env.MY_AWS_CLOUDFRONT_DOMAIN, "/").concat(thumbKey),
                                mediumUrl: "https://".concat(process.env.MY_AWS_CLOUDFRONT_DOMAIN, "/").concat(mediumKey),
                                key: filename,
                                id: index,
                            };
                        })) !== null && _b !== void 0 ? _b : [])];
            }
        });
    });
}
/**
 * Get all folders in the bucket (top-level)
 */
function listFolders() {
    return __awaiter(this, void 0, void 0, function () {
        var command, response;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    command = new client_s3_1.ListObjectsV2Command({
                        Bucket: process.env.MY_AWS_BUCKET_NAME,
                        Delimiter: "/", // returns "folders" in CommonPrefixes
                    });
                    return [4 /*yield*/, s3.send(command)];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, ((_b = (_a = response.CommonPrefixes) === null || _a === void 0 ? void 0 : _a.map(function (p) { var _a; return (_a = p.Prefix) === null || _a === void 0 ? void 0 : _a.replace(/\/$/, ""); })) !== null && _b !== void 0 ? _b : [])];
            }
        });
    });
}
/**
 * Main build-time script
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var folders, result, _i, folders_1, folder, _a, _b, outputPath;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, listFolders()];
                case 1:
                    folders = _c.sent();
                    console.log(folders);
                    result = {};
                    _i = 0, folders_1 = folders;
                    _c.label = 2;
                case 2:
                    if (!(_i < folders_1.length)) return [3 /*break*/, 5];
                    folder = folders_1[_i];
                    console.log("Processing gallery: ".concat(folder));
                    _a = result;
                    _b = folder;
                    return [4 /*yield*/, listImages(folder)];
                case 3:
                    _a[_b] = _c.sent();
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    outputPath = path.join(process.cwd(), "public", "galleries.json");
                    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
                    console.log("Gallery JSON created at ".concat(outputPath));
                    console.log("hallo");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
