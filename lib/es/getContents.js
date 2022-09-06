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
import * as github from '@actions/github';
const getContents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
                value = parseInt(value, 10);
            }
            query[key] = value;
        }
        const octokit = new github.GitHub(token);
        console.log('GitHub client has been initialized.');
        // https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context
        // https://github.com/actions/toolkit/blob/main/packages/github/src/context.ts
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
        const list = yield octokit.issues.listForRepo(Object.assign(Object.assign({}, repository), query));
        return {
            issues: list.data,
        };
    }
    catch (error) {
        core.setFailed(error.message);
        throw error.message;
    }
});
export default getContents;
