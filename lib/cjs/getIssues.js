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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
const getContents_1 = __importDefault(require("./getContents"));
const getIssues = () => __awaiter(void 0, void 0, void 0, function* () {
    const contents = yield (0, getContents_1.default)();
    console.log('Contents has been retrieved.');
    const result = contents.issues
        .map((item) => {
        const { id, title, labels, body, html_url, nodes } = item;
        const labelNames = labels.map((v) => v.name);
        return {
            id,
            title,
            labels: labelNames,
            body,
            html_url,
            nodes,
        };
    })
        .reduce((prev, cur) => {
        const label = cur.labels.find((v) => constant_1.LABELS.includes(v));
        if (!label)
            return prev;
        if (Object.prototype.hasOwnProperty.call(prev, label)) {
            prev[label].push(cur);
        }
        else {
            prev[label] = [cur];
        }
        return prev;
    }, {});
    return result;
});
exports.default = getIssues;
