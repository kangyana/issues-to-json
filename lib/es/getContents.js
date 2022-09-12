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
    const { data } = yield octokit.issues.listForRepo(Object.assign(Object.assign({}, repository), query));
    data.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield octokit.issues.listComments(Object.assign(Object.assign(Object.assign({}, repository), query), { issue_number: item.number }));
        item.nodes = res.data;
    }));
    // const { data } = await octokit.issues.listComments({
    //   ...repository,
    //   ...query,
    //   issue_number: 2,
    // });
    return {
        issues: data,
    };
});
export default getContents;
