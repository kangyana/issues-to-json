var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as core from '@actions/core';
import getContents from './getContents';
const getIssues = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contents = yield getContents();
        console.log('Contents has been retrieved.');
        const issues = contents.issues;
        const result = issues.filter((item) => item.labels.findIndex((v) => v.name === 'question'));
        return result;
    }
    catch (error) {
        core.setFailed(error.message);
    }
});
export default getIssues;
