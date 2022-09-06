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
import { writeFileSync } from 'fs';
import { WRITE_FILE } from './constant';
import getIssues from './getIssues';
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Initializing.');
        const issueList = yield getIssues();
        yield writeFileSync(WRITE_FILE, JSON.stringify(issueList));
        console.log('New file has been written.');
    }
    catch (error) {
        core.setFailed(error.message);
    }
});
main();
