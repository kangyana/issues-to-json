"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const getContents = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = core.getInput('GITHUB_TOKEN');
    const queryArr = [
        'milestone',
        'state',
        'assignee',
        'creator',
        'mentioned',
        'labels',
        'sort',
        'direction',
        'since',
        'per_page',
        'page',
    ];
    const query = {};
    for (const key of queryArr) {
        let value = core.getInput(key);
        if (!value)
            continue;
        if (['per_page', 'page'].includes(key) && value) {
            value = parseInt(value, 10).toString();
        }
        query[key] = value;
    }
    const octokit = new github.GitHub(token);
    console.log('GitHub client has been initialized.');
    let repository = github.context.repo;
    const repo = core.getInput('repo');
    if (repo) {
        const parts = repo.split('/');
        if (parts.length === 2) {
            repository = {
                owner: parts[0],
                repo: parts[1],
            };
        }
    }
    // paging load
    const issueList = [];
    let lastTotal = 0; // last request response data length
    let page = 0;
    const pageSize = Number(query.per_page);
    do {
        page += 1;
        const res = yield octokit.issues.listForRepo(Object.assign(Object.assign(Object.assign({}, repository), query), { page }));
        issueList.push(...res.data);
        lastTotal = res.data.length;
        // no next page
    } while (lastTotal !== pageSize);
    const promiseArr = issueList.map((item) => {
        return octokit.issues
            .listComments(Object.assign(Object.assign({}, repository), { issue_number: item.number }))
            .then((res) => {
            item.nodes = res.data;
        });
    });
    yield Promise.all(promiseArr);
    return {
        issues: issueList,
    };
});
exports.default = getContents;
